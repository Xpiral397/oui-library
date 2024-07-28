# utils.py
import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UserAccount
from .email import SendEmail
from share.serializers import UserAccountSerializerAll

try:
    from admins.serializers import CreateAdminSerializer
except ImportError:
    pass
from datetime import datetime, timedelta
from django.utils import timezone
from django.contrib.auth import authenticate
import jwt
from dotenv import load_dotenv
import json, os

load_dotenv()


def getOTP():
    return "-".join(
        [
            "".join(random.choices("123456789012345326789291028", k=3))
            for i in range(0, 3)
        ]
    )


Key = "82f8e1e443be8592f0d5519229c3caedb40e99e174098f4fae7f9fa7f3826b13"

print(Key)


def generate_tokens(user):
    # Set token expiration time for access token (for example, 1 hour)
    access_token_exp_time = timezone.now() + timedelta(hours=1)
    # Set token expiration time for refresh token (for example, 7 days)
    refresh_token_exp_time = timezone.now() + timedelta(days=7)

    # Generate access token payload
    access_token_payload = user
    access_token_payload.data.update(
        {
            "exp": access_token_exp_time,
        }
    )
    print(access_token_payload.data)
    # Generate access token
    access_token = jwt.encode(access_token_payload.data, Key, algorithm="HS256")

    # Generate refresh token payload
    refresh_token_payload = {
        "access_token": access_token,
        "exp": refresh_token_exp_time,
    }
    # Generate refresh token
    refresh_token = jwt.encode(refresh_token_payload, Key, algorithm="HS256")

    return access_token, refresh_token


def generate_access_token(user_id):
    # Set token expiration time for access token (for example, 1 hour)
    access_token_exp_time = timezone.now() + timedelta(hours=1)
    # Generate access token payload
    access_token_payload = {
        "user_id": user_id,
        "exp": access_token_exp_time,
    }
    # Generate access token
    access_token = jwt.encode(access_token_payload, Key, algorithm="HS256")
    return access_token


def get_user_by_token(token):
    try:
        return jwt.decode(token, Key, algorithms="HS256")
    except Exception:
        return None


def generate_tokens(user, admin=False):
    # Set token expiration time for access token (for example, 1 hour)
    access_token_exp_time = timezone.now() + timedelta(hours=1)
    # Set token expiration time for refresh token (for example, 7 days)
    refresh_token_exp_time = timezone.now() + timedelta(days=7)

    # Generate access token payload
    access_token_payload = (
        UserAccountSerializerAll(user) if not admin else CreateAdminSerializer(user)
    )
    access_token_payload.data.update(
        {
            "exp": access_token_exp_time,
        }
    )
    print(access_token_payload.data)
    # Generate access token
    access_token = jwt.encode(access_token_payload.data, Key, algorithm="HS256")

    # Generate refresh token payload
    refresh_token_payload = {
        "access_token": access_token,
        "exp": refresh_token_exp_time,
    }
    # Generate refresh token
    refresh_token = jwt.encode(refresh_token_payload, Key, algorithm="HS256")

    return access_token, refresh_token


def generate_access_token(user_id):
    # Set token expiration time for access token (for example, 1 hour)
    access_token_exp_time = timezone.now() + timedelta(hours=1)
    # Generate access token payload
    access_token_payload = {
        "user_id": user_id,
        "exp": access_token_exp_time,
    }
    # Generate access token
    access_token = jwt.encode(access_token_payload, Key, algorithm="HS256")
    return access_token


def get_user_by_token(token):
    print(token)
    try:
        return jwt.decode(token, Key, algorithms="HS256")
    except Exception as e:
        return None
