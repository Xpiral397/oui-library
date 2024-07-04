from django.urls import path
from .views import *


urlpatterns = [
    path("create-token/", generate_access_token, name="token"),
    path("add/books/", add_new_books, name="add-new-books"),
    path("register/", register_admin, name="token"),
    path("otp/", verify_otp, name="token"),
    path("get-otp/", re_generate_otp, name="login"),
    path("login/", login, name="login"),
    path("me/", UserDashabordView.as_view()),
]
