from rest_framework import serializers
from .models import (
    UserPreferance,
    AdminAccount,
    UserAccount,
    Book,
    Reserved,
    Lend,
    Balance,
)


class AdminAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminAccount
        fields = "__all__"  # Serialize all fields


class UserPreferanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreferance
        fields = "__all__"


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = fields = [
            "matric_number",
            "password",
            "name",
            "email",
            "full_name",
            "faculty",
            "department",
            "gender",
            "number",
        ]  # Serialize all fields


class UserAccountSerializerAll(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"  # Serialize all fields


class LendSerializer(serializers.ModelSerializer):
    book = serializers.PrimaryKeyRelatedField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Lend
        fields = "__all__"  # Serialize all fields


class LendSerializer2(serializers.ModelSerializer):
    book = serializers.PrimaryKeyRelatedField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Lend
        fields = "__all__"  # Serialize all fields


class ReservedSerializer(serializers.ModelSerializer):
    book = serializers.PrimaryKeyRelatedField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Reserved
        fields = "__all__"  # Serialize all fields


class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = "__all__"  # Serialize all fields


class LendSerializer2(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)

    class Meta:
        model = Lend
        fields = "__all__"
