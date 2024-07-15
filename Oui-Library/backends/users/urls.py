from django.urls import path
from .views import *


urlpatterns = [
    path("register/", register, name="register"),
    path("verify-otp/", verify_otp, name="verify_otp"),
    path("login/", login, name="login"),
    path("refresh-token/", refresh_token, name="refresh_token"),
    path("otp/", re_generate_otp, name="re-send-token"),
    path("me/", UserDashabordView.as_view()),
    path("book/<str:id>/", GetAllBooksByID.as_view({"get": "get"}), name="book"),
    path(
        "book/update/<str:id>/",
        GetAllBooksByID.as_view({"post": "update_book"}),
        name="book",
    ),
    path(
        "admin/me/", UserDashabordViews.as_view({"get": "get-admin"}, name="get-admin")
    ),
]
