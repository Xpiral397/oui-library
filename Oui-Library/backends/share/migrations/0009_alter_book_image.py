# Generated by Django 4.2.10 on 2024-06-16 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('share', '0008_alter_book_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='image',
            field=models.ImageField(upload_to='books/'),
        ),
    ]
