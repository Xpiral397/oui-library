from rest_framework import serializers
from .models import Book, UserAccount, UserPaymentAlert
from django.contrib.auth import get_user_model
UserModel = get_user_model()



class UserCreateSerializer(serializers.ModelSerializer):  
  
    class Meta:
        model = UserModel
        fields = ['matric_number', 'password', 'name', 'email', 'full_name', 'faculty', 'department', 'gender', 'number','expected_year_of_graduation']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print(validated_data)
        user = UserModel.objects.create_user(**validated_data)
        return user




# class UserAccountSerializer(serializers.ModelSerializer):
#     borrowed_books = BookSerializer(many=True, read_only=True)
#     payment_alerts = PaymentAlertSerializer(many=True, read_only=True)

#     class Meta:
#         model = UserAccount
#         fields = ['id', 'email', 'username', 'date_of_birth', 'preferred_language', 'favorite_option', 'occupation', 'borrowed_books', 'payment_alerts']
