# Generated by Django 4.2.10 on 2024-07-27 14:46

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('share', '0013_reserved_end_date_reserved_start_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reserved',
            name='user',
        ),
        migrations.AddField(
            model_name='reserved',
            name='user',
            field=models.ManyToManyField(related_name='User', to=settings.AUTH_USER_MODEL),
        ),
    ]
