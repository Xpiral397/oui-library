# from share.models import AdminAccount, UserAccount, Book
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models
from django.utils import timezone


# class UserProfile(models.Model):
#     user = models.OneToOneField(AdminAccount, on_delete=models.CASCADE)
#     manager = models.ForeignKey('self', on_delete=models.CASCADE, related_name='subordinates', null=True, blank=True)
#     added_by = models.ForeignKey(AdminAccount, on_delete=models.SET_NULL, related_name='added_subordinates', null=True, blank=True)

#     def __str__(self):
#         return self.user.username

# @receiver(post_save, sender=UserProfile)
# def update_added_by(sender, instance, created, **kwargs):
#     if created:
#         instance.added_by = instance.manager.user if instance.manager else None
#         instance.save()
   
# class Genre(models.Model):
#     name = models.CharField(max_length=100, unique=True)

#     def __str__(self):
#         return self.name



