# project/urls.py

from django.contrib import admin
from djoser import views
from django.urls import path, include
from users.views import fetch_cookies,CustomCurrentUserView,UpdateUserData,GetCookiesView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),  # Include Djoser authentication URLs
    path('auth/', include('djoser.urls.jwt')), 
    path('auth/me/', views.UserViewSet.as_view({'get': 'me'}), name='user-me'),
    path('auths/user/me/', CustomCurrentUserView.as_view(), name='user-mes'),
    path('register/', RegisterUserAPIView.as_view(), name='register_user'),
    path('verify-otp/', VerifyOTPAPIView.as_view(), name='verify_otp'),

]
