from django.urls import path
from .views import *


urlpatterns = [
    path("create-token/", generate_access_token, name="token"),
    path("/get/books/", generate_access_token, name="token"),
    path("/get/reserved", get_user_reversed_plan, name="reserved"),
    path("/get/lent", get_user_lent_plan, name="reserved"),
    path("add/books/", add_new_books, name="add-new-books"),
    path("register/", register_admin, name="token"),
    path("otp/", verify_otp, name="token"),
    path("get-otp/", re_generate_otp, name="login"),
    path("login/", login, name="login"),
    path("me/", UserDashabordView.as_view()),
]
