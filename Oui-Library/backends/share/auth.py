from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from share.utils import get_user_by_token
from dotenv import load_dotenv
# from .dual import AdminDualView as  AdminDashboardView, UserDualView as UserDashboardView
from users.models import UserAccount

import os, jwt


load_dotenv()

from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import BasePermission

class CustomTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.headers.get('Authorization')
        if token and token.startswith('JWT'):
            token = token.split(" ")[1]
            print(token)
            user = get_user_by_token(token)
            if user is None:
                raise AuthenticationFailed('Invalid token format')
            try:
                if not user.get('matric_number'):
                    print('hello')
                    from .models import AdminAccount
                    staff =  AdminAccount.objects.get(email = user['email'])
                    return (staff, token)
                else:
                    user_account = UserAccount.objects.get(matric_number=user['matric_number'])
                    return (user_account, token)
            except UserAccount.DoesNotExist:
                raise AuthenticationFailed('User not found')
            except jwt.exceptions.DecodeError:
                raise AuthenticationFailed('Invalid token')
        else:
            raise AuthenticationFailed('Invalid token formats')

class CustomPermission(BasePermission):
    def has_permission(self, request, view):
        if hasattr(view,'isAdminClasses') and  view.name == True:
            return request.user.is_authenticated and request.user.is_staff
        return request.user.is_authenticated
        

class IsAdminPermission(BasePermission):
    def has_permission(self, request, view):
        if hasattr(view,'isAdminClasses') and  view.name == True:
            return request.user.is_authenticated and request.user.is_staff
        return request.user.is_authenticated
  
# In your DRF settings
