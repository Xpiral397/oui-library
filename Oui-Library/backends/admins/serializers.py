from rest_framework import serializers
from share.models import Book, UserAccount
from django.contrib.auth import get_user_model
from share.models import AdminAccount

UserModel = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    matric_number = serializers.CharField(required=True)
    number = serializers.CharField(required=True)
    full_name = serializers.CharField(required=True)
    faculty = serializers.CharField(required=True)
    department = serializers.CharField(required=True)
    expected_year_of_graduation = serializers.CharField(required=True)
    gender = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = UserModel
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = UserModel.objects.create_user(**validated_data)
        return user


class CreateAdminSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    number = serializers.CharField(required=True)
    full_name = serializers.CharField(required=True)
    gender = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = AdminAccount
        fields = ["name", "email", "number", "full_name", "gender", "password"]
        # extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        admin = AdminAccount.objects.create_admin(**validated_data)
        return admin


class AdminSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    number = serializers.CharField(required=True)
    full_name = serializers.CharField(required=True)
    gender = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = AdminAccount
        fields = "__all__"
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        admin = AdminAccount.objects.create_admin(**validated_data)
        return admin


# class GenreSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Genre
#         fields = '__all__'

from rest_framework import serializers

from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"

    def validate_image(self, image):
        # Resize image
        image = self.resize_image(image)
        return image

    def resize_image(self, image, max_size=(300, 300), max_file_size=400 * 1024):
        img = Image.open(image)
        img.thumbnail(max_size, Image.LANCZOS)

        # Save image to BytesIO
        img_io = BytesIO()
        img.save(img_io, format=img.format)
        img_io.seek(0)

        # Check if the image size exceeds the maximum file size
        while img_io.getbuffer().nbytes > max_file_size:
            img = img.resize(
                (int(img.size[0] * 0.9), int(img.size[1] * 0.9)), Image.LANCZOS
            )
            img_io = BytesIO()
            img.save(img_io, format=img.format)
            img_io.seek(0)

        return InMemoryUploadedFile(
            img_io,
            None,
            image.name,
            image.content_type,
            img_io.getbuffer().nbytes,
            None,
        )


# class BorrowingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Borrowing
#         fields = '__all__'

# class PaymentAlertSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PaymentAlert
#         fields = '__all__'

# class UserAccountSerializer(serializers.ModelSerializer):
#     borrowed_books = BookSerializer(many=True, read_only=True)
#     payment_alerts = PaymentAlertSerializer(many=True, read_only=True)

#     class Meta:
#         model = UserAccount
#         fields = ['id', 'email', 'username', 'date_of_birth', 'preferred_language', 'favorite_option', 'occupation', 'borrowed_books', 'payment_alerts']
