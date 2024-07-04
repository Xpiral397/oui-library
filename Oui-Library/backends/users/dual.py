from rest_framework.views import APIView
from django.shortcuts import HttpResponse as Response


class UserDashabordView(APIView):
    # permission_classes = (CustomPermission, CustomTokenAuthentication)
   
    def get(self, request):
        return self.request.user
    
    def add_new_book(self, request):
        # Logic to add a new book
        return Response("New book added")

    def remove_book(self, request):
        # Logic to remove a book
        return Response("Book removed")

    def get_all_borrowed_books(self, request):
        # Logic to get all borrowed books
        return Response("List of borrowed books")

    def get_payment_details(self, request):
        # Logic to get payment details
        return Response("Payment details")

    def remove_payment(self, request):
        # Logic to remove payment
        return Response("Payment removed")

    def modify_book(self, request):
        # Logic to modify a book
        return Response("Book modified")

class AdminDashabordView(APIView):    
    def get_user(self, request):
        return self.request.user
    
    def add_new_book(self, request):
        # Logic to add a new book
        return Response("New book added")

    def remove_book(self, request):
        # Logic to remove a book
        return Response("Book removed")

    def get_all_borrowed_books(self, request):
        # Logic to get all borrowed books
        return Response("List of borrowed books")

    def get_payment_details(self, request):
        # Logic to get payment details
        return Response("Payment details")

    def remove_payment(self, request):
        # Logic to remove payment
        return Response("Payment removed")

    def modify_book(self, request):
        # Logic to modify a book
        return Response("Book modified")
    