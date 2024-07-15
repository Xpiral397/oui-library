from django.shortcuts import render
from django.db import IntegrityError
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import permission_classes, api_view
from django.contrib.auth.hashers import check_password
from share.models import AdminAccount
from share.utils import getOTP
from rest_framework.views import status
from .serializers import CreateAdminSerializer, BookSerializer, AdminSerializer
import datetime, json
from share.utils import *
from share.models import Book
from datetime import timedelta
from share.email import SendEmail
from rest_framework.views import APIView


class UserDashabordView(APIView):
    # permission_classes = (CustomPermission, CustomTokenAuthentication)

    def get(self, request):
        return JsonResponse(
            AdminSerializer(
                AdminAccount.objects.get(email=self.request.user.email)
            ).data,
            safe=False,
        )


# Create your views here.
@csrf_exempt
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def register_admin(request):
    if request.method.is_staff:
        try:
            data = json.load(request)
        except json.JSONDecodeError:
            return JsonResponse(
                {
                    "error": [
                        "No require info found",
                    ]
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = CreateAdminSerializer(data=data)

        try:
            if serializer.is_valid():
                user = serializer.save()
                otp = getOTP()
                user.otp = otp.replace("-", "")
                user.otp_expiration_time = datetime.timestamp(
                    datetime.now() + timedelta(minutes=5)
                )
                user.save()
                email = SendEmail(data["email"], admin=True)
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
    return JsonResponse(
        {
            "error": [
                "Method Not Allowed",
            ]
        },
        status=status.HTTP_405_METHOD_NOT_ALLOWED,
    )


@csrf_exempt
def re_generate_otp(request):
    if request.method == "POST":
        data = json.load(request)
        email = data.get("email")
        try:
            # print(matric_number, AdminAccount.objects.values('otp', 'email'))
            user = AdminAccount.objects.get(email=email)
            print(user)
            otp = getOTP()
            user.otp = otp.replace("-", "")
            user.otp_expiration_time = datetime.timestamp(
                datetime.now() + timedelta(minutes=5)
            )
            user.save()
            email = SendEmail(user.email, admin=True)
            print(otp)
            email.SendAccountSuccessEmail(otp)
            return JsonResponse({"message": "OTP sent. Please verify Your OTP."})
        except AdminAccount.DoesNotExist:
            return JsonResponse(
                {"error": "You have not been register by any admin before"}, status=400
            )


@csrf_exempt
def verify_otp(request):
    if request.method == "POST":
        data = json.load(request)
        email = data.get("email")
        otp_entered = data.get("otp")
        try:
            print(otp_entered, email, AdminAccount.objects.values("otp", "email"))
            user = AdminAccount.objects.get(otp=otp_entered, email=email)
            _unexpiredOTP = datetime.now().timestamp() < user.otp_expiration_time
            if _unexpiredOTP:
                user.has_confirm_otp = True
                user.save()
                return JsonResponse(
                    {"message": "OTP verification successful. Registration completed."}
                )
            return JsonResponse({"error": "Invalid OTP. Please try again."}, status=400)
        except AdminAccount.DoesNotExist:
            return JsonResponse(
                {"error": "You have not been register by any admin before"}, status=400
            )


def authenticate(email, password):
    user = AdminAccount.objects.get(email=email)
    return user if user.check_password(password) else False


@csrf_exempt
def login(request):
    if request.method == "POST":
        data = json.load(request)
        email = data.get("email")
        password = data.get("password")

        if email and password:
            user = authenticate(email=email, password=password)
            if not user:
                return JsonResponse({"error": "Password did not match"}, status=400)
            if user:
                # print(user)
                # Generate access token and refresh token
                access_token, refresh_token = generate_tokens(user, admin=True)
                return JsonResponse(
                    {"access_token": access_token, "refresh_token": refresh_token}
                )
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=400)
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


@csrf_exempt
@api_view(["POST"])
@permission_classes([IsAdminUser])
def add_new_books(request):
    if not request.user.is_staff:
        return JsonResponse(
            {"error": "You have not been registered by any admin before"}, status=400
        )

    try:
        # Convert request.POST to a dictionary
        data = {**request.POST.dict(), **request.FILES.dict()}

        # Serialize data
        serializer = BookSerializer(data=data)

        # Validate and save the data
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(data=serializer.data, safe=False, status=201)
        else:
            return JsonResponse({"errors": serializer.errors}, status=400)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
