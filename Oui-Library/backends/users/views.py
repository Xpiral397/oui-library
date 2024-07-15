from django.http import JsonResponse
from django.shortcuts import HttpResponse as Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import action
from .models import Book, UserAccount
from share.email import SendEmail
from .serializers import UserCreateSerializer
from share.serializers import BookSerializer
from share.utils import *
from datetime import datetime, timedelta
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from django.db.utils import IntegrityError
from django.core.files.base import ContentFile
from django.contrib.auth import get_user_model
from django.conf import settings


UserModel = get_user_model()


@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.load(request)
        data["matric_number"] = data["matric_number"].upper()
        serializer = UserCreateSerializer(data=data)
        try:
            if serializer.is_valid():
                user = serializer.save()
                otp = getOTP()
                user.otp = otp.replace("-", "")
                user.otp_expiration_time = datetime.timestamp(
                    datetime.now() + timedelta(minutes=5)
                )
                user.save()
                email = SendEmail(data["email"])
                print(otp)
                email.SendAccountSuccessEmail(otp)
                print("ji")
            else:
                return JsonResponse({"errors": serializer.errors}, status=400)
            # Send OTP to user's mobile number (implementation required)
        except IntegrityError as e:
            print(e)
            return JsonResponse(
                {
                    "error": [
                        "User already exist",
                    ]
                },
                status=400,
            )
        else:
            return JsonResponse(
                {"message": "Registration successful. Please verify Your OTP."}
            )


@csrf_exempt
def re_generate_otp(request):
    if request.method == "POST":
        data = json.load(request)
        matric_number = data.get("matric_number")
        try:
            print(matric_number, UserAccount.objects.values("otp", "matric_number"))
            user = UserAccount.objects.get(matric_number=matric_number)
            otp = getOTP()
            user.otp = otp.replace("-", "")
            user.otp_expiration_time = datetime.timestamp(
                datetime.now() + timedelta(minutes=5)
            )
            user.save()
            email = SendEmail(user.email)
            print(otp)
            email.SendAccountSuccessEmail(otp)
            return JsonResponse({"message": "OTP sent. Please verify Your OTP."})
        except UserAccount.DoesNotExist:
            return JsonResponse({"error": "You have not registered"}, status=400)


@csrf_exempt
def verify_otp(request):
    if request.method == "POST":
        data = json.load(request)
        matric_number = data.get("matric_number")
        otp_entered = data.get("otp")
        try:
            print(
                otp_entered,
                matric_number,
                UserAccount.objects.values("otp", "matric_number"),
            )
            user = UserAccount.objects.get(otp=otp_entered, matric_number=matric_number)
            _unexpiredOTP = datetime.now().timestamp() < user.otp_expiration_time
            if _unexpiredOTP:
                user.has_confirm_otp = True
                user.save()
                return JsonResponse(
                    {"message": "OTP verification successful. Registration completed."}
                )
            return JsonResponse({"error": "Invalid OTP. Please try again."}, status=400)
        except UserAccount.DoesNotExist:
            return JsonResponse(
                {"error": "User not found." + matric_number}, status=400
            )


@csrf_exempt
def login(request):
    if request.method == "POST":
        data = json.load(request)
        matric_number = data.get("matric_number")
        password = data.get("password")

        if matric_number and password:
            try:
                user = UserModel.objects.get(matric_number=matric_number)
            except UserModel.DoesNotExist as e:
                return JsonResponse(
                    {"error": "Invalid credentials"},
                    status=400,
                )
            print(user)
            if user.check_password(password):
                # Generate access token and refresh token
                access_token, refresh_token = generate_tokens(user)
                return JsonResponse(
                    {"access_token": access_token, "refresh_token": refresh_token}
                )
            else:
                return JsonResponse({"error": "password not correct"}, status=400)
        else:
            return JsonResponse({"error": "Missing credentials"}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def refresh_token(request):
    if request.method == "POST":
        # Get refresh token from request data
        refresh_token_data = json.loads(request.body.decode("utf-8"))
        refresh_token = refresh_token_data.get("refresh_token")
        if refresh_token:
            # Verify refresh token
            try:
                refresh_token_payload = jwt.decode(
                    refresh_token, os.getenv("SECRET_KEY"), algorithms=["HS256"]
                )
                print(refresh_token_payload, "paylaod")
                # Convert exp timestamp to UTC timezone-aware datetime
                exp_datetime = timezone.datetime.utcfromtimestamp(
                    refresh_token_payload["exp"]
                ).replace(tzinfo=timezone.utc)
                # Check if the refresh token is not expired
                if timezone.now() < exp_datetime:
                    return JsonResponse(
                        {"access_token": refresh_token_payload["access_token"]}
                    )
                else:
                    return JsonResponse(
                        {"error": "Refresh token has expired"}, status=400
                    )
            except jwt.ExpiredSignatureError:
                return JsonResponse({"error": "Refresh token has expired"}, status=400)
            except jwt.InvalidTokenError:
                return JsonResponse({"error": "Invalid refresh token"}, status=400)
        else:
            return JsonResponse({"error": "Refresh token is missing"}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


class UserDashabordView(APIView):
    # permission_classes = (CustomPermission, CustomTokenAuthentication)

    def get(self, request):
        return JsonResponse(UserCreateSerializer(self.request.user).data, safe=False)


class UserDashabordViews(ModelViewSet):
    # permission_classes = (CustomPermission, CustomTokenAuthentication)

    def get(self, request):
        return JsonResponse(UserCreateSerializer(self.request.user).data, safe=False)

    @action(
        detail=False,
        methods=["get"],
        url_name="get_admin",
        permission_classes=[IsAdminUser],
    )
    def get_admin(self, request):
        return JsonResponse(CreateAdminSerializer(self.request.user).data, safe=False)


class GetAllAvaliableBooks(APIView):
    def get(self, request):
        all_books = Book.objects.all()
        serializer = BookSerializer(all_books, many=True)
        return JsonResponse({"books": serializer.data})


class GetAllBooksByID(ModelViewSet):

    @action(
        detail=True, methods=["get"], permission_class=[IsAdminUser, IsAuthenticated]
    )
    def get(self, request, id):
        all_books = Book.objects.get(id=id)
        serializer = BookSerializer(all_books)
        return JsonResponse({"books": serializer.data})

    @action(detail=True, methods=["post"], permission_class=[IsAdminUser])
    def update_book(self, request, id):
        books = Book.objects.filter(id=id)
        books.update(**{**request.POST.dict()})
        current_book = books.get(id=id)
        content = ContentFile(request.FILES["image"].read(), name=current_book.title)
        current_book.image.save(current_book.title, content)
        current_book.save()

        return JsonResponse({"sucess": "true"})


class GetAllBooksByName(APIView):
    def get(self, request, name):
        all_books = Book.objects.filter(title_icontains=name)
        serializer = BookSerializer(all_books, many=True)
        return JsonResponse({"books": serializer.data})


class GetAllBooksByAuthor(APIView):
    def get(self, request, author):
        all_books = Book.objects.filter(author_icontains=author)
        serializer = BookSerializer(all_books, many=True)
        return JsonResponse({"books": serializer.data})


class AdminDashabordView(APIView):
    name = "isAdmin"
    # permission_classes = (CustomPermission, CustomTokenAuthentication)

    def get_user(self, request):
        return self.request.user

    def add_new_book(self, request):
        # Logic to add a new book
        return Response("New book added")

    def remove_book(self, request):
        # Logic to remove a book
        return Response("Book removed")

    def get_all_borrowed_books(self, request):
        # Logic to get all borrowed books
        return Response("List of borrowed books")

    def get_payment_details(self, request):
        # Logic to get payment details
        return Response("Payment details")

    def remove_payment(self, request):
        # Logic to remove payment
        return Response("Payment removed")

    def modify_book(self, request):
        # Logic to modify a book
        return Response("Book modified")
