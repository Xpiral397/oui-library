"""
Django settings for KICData project.

Generated by 'django-admin startproject' using Django 4.2.10.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

import datetime
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

import os
from dotenv import load_dotenv

load_dotenv()

# Now you can access your environment variables like this:
SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = os.getenv("DEBUG") == "True"  # Convert string 'True' to boolean True


CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = True

ALLOWED_HOSTS = ["*"]


INSTALLED_APPS = [
    # 'django.contrib.admin',
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "admins",
    "users",
    "compressor",
    "rest_framework",
    "rest_framework_simplejwt",
    "share",
    "djoser",
]
# settings.py

# DJOSER = {
#     'VIEWSET': 'djoser.views.UserViewSet',
#     'USER_ID_FIELD': 'id',  # Optional: Specify the user ID field
#     'SERIALIZER_GETTER': 'users.utils.get_user_serializer',
#     "LOGIN_FILED":"email",
#     "USER_CREATE_PASSWORD":True,
#     "USERNAME_CHANGED_EMAIL_CONFIRMATION":True,
#     "PASSWORD_CHANGED_EMAIL_CONFIRMATION":True,
#     "SEND_CONFIRMATION_EMAIL":True,
#     "SET_PASSWORD_RETYPE":True,
#     "SET_USERNAME_RETYPE":True,
#     "PASSWORD_RESET_CONFIRM_URL":'/auth/reset/password/{uid}/{token}',
#     "USERNAME_RESET_CONFIRM_URL":'auth/reset-email-confirm/{uid}/{token}',
#     "ACTIVATION_URL":"/auth/activate/email/{uid}/{token}",
#     "SEND_ACTIVATION_EMAIL":True,
#     'SERIALIZERS': {
#         'user_create': 'users.serializers.UserCreateSerializer',
#         'user': 'users.serializers.UserCreateSerializer',
#         "user_delete":"djoser.serializers.UserDeleteSerializer"
#     }
# }

SIMPLE_JWT = {"AUTH_HEADER_TYPES": ("JWT",)}

AUTH_USER_MODEL = "share.UserAccount"


# DJOSER = {
#     ,
#     'HIDE_USERS': False,  # Show users in the user list endpoint
#     'TOKEN_MODEL': 'rest_framework_simplejwt.tokens.AccessToken',
#     'TOKEN_ROTATE_REFRESH': True,
#     'TOKEN_REFRESH_LIFETIME': 60 * 60 * 24 * 7,  # 7 days
#     'TOKEN_LIFETIME': 60 * 60 * 24 * 14,  # 14 days
# }


# Django Rest Framework settings
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
}


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "django.middleware.gzip.GZipMiddleware",
]

SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": ("JWT",),
}

JWT_AUTH = {
    # how long the original token is valid for
    "JWT_EXPIRATION_DELTA": datetime.timedelta(days=2),
    # allow refreshing of tokens
    "JWT_ALLOW_REFRESH": True,
    # this is the maximum time AFTER the token was issued that
    # it can be refreshed.  exprired tokens can't be refreshed.
    "JWT_REFRESH_EXPIRATION_DELTA": datetime.timedelta(days=7),
}


REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "share.auth.CustomTokenAuthentication",
        # Other authentication classes
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "share.auth.CustomPermission",
        "rest_framework.permissions.IsAuthenticated",
        # Other permission classes
    ],
    # Other REST Framework settings
}

DOMAIN = "localhost:3000"
SITE_NAME = "OUI Library System "

CORS_ALLOWED_ORIGINS = [
    "https://example.com",
    "https://sub.example.com",
    "http://localhost:3001",
    "http://127.0.0.1:9000",
]

ROOT_URLCONF = "LibraryAI.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# DJOSER = {
#     'SERIALIZERS': {
#         'user': 'your_project.serializers.CustomUserSerializer',  # Replace with your actual serializer path
#     },
#     'LOGIN_FIELD': 'email',  # Assuming you use email for login, change as needed
#     'SEND_ACTIVATION_EMAIL': True,
#     'SEND_CONFIRMATION_EMAIL': True,
#     'PASSWORD_RESET_CONFIRM_URL': '#/password/reset/confirm/{uid}/{token}',
#     'ACTIVATION_URL': '#/activate/{uid}/{token}',
#     'SEND_ACTIVATION_EMAIL': True,
# }
WSGI_APPLICATION = "LibraryAI.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


COMPRESS_ROOT = BASE_DIR / "static"

COMPRESS_ENABLED = True

STATICFILES_FINDERS = ("compressor.finders.CompressorFinder",)


MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")


# GOOGLE_OAUTH2_CLIENT_SECRETS_FILE = os.path.join(BASE_DIR, "credential.json")
# print(GOOGLE_OAUTH2_CLIENT_SECRETS_FILE, "kop")
# GOOGLE_OAUTH2_SCOPES = ["https://www.googleapis.com/auth/drive.file"]
# GOOGLE_OAUTH2_REDIRECT_URI = "http://localhost:8000/oauth2callback"


EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_HOST_PASSWORD = "ftit ehxg vppb jxf"
EMAIL_HOST_USER = "xpiraltechs@gmail.com"
EMAIL_USE_TLS = True
