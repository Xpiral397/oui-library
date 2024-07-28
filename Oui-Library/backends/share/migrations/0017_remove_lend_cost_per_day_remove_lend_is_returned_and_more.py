# Generated by Django 4.2.10 on 2024-07-27 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('share', '0016_remove_lend_book_lend_book'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lend',
            name='cost_per_day',
        ),
        migrations.RemoveField(
            model_name='lend',
            name='is_returned',
        ),
        migrations.RemoveField(
            model_name='lend',
            name='return_date',
        ),
        migrations.AddField(
            model_name='lend',
            name='due_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='lend',
            name='start_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
