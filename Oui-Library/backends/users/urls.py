from django.urls import path
from .views import *



urlpatterns = [
    path('register/', register, name='register'),
    path('verify-otp/', verify_otp, name='verify_otp'),
    path('login/', login, name='login'),
    path('refresh-token/', refresh_token, name='refresh_token'),
    path("otp/", re_generate_otp, name = 're-send-token'),
    path('me/', UserDashabordView.as_view()),
]
