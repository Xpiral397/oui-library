# signals.py

from django.dispatch import receiver
from djoser.signals import user_activated

@receiver(user_activated)
def user_activated_handler(sender, user, request, **kwargs):
    # Your custom code here
    user.is_active = True
    user. has_confirm_email = True
    user.has_confirm_full_name
    user.save()
    
    return user
