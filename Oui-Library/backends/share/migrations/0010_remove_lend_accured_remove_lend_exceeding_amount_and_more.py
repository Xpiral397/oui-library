# Generated by Django 4.2.10 on 2024-07-15 12:39

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('share', '0009_alter_book_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lend',
            name='accured',
        ),
        migrations.RemoveField(
            model_name='lend',
            name='exceeding_amount',
        ),
        migrations.RemoveField(
            model_name='lend',
            name='outlay',
        ),
        migrations.RemoveField(
            model_name='reserved',
            name='accured',
        ),
        migrations.RemoveField(
            model_name='reserved',
            name='cost_per_day',
        ),
        migrations.RemoveField(
            model_name='reserved',
            name='is_returned',
        ),
        migrations.RemoveField(
            model_name='reserved',
            name='outlay',
        ),
        migrations.RemoveField(
            model_name='reserved',
            name='unlocked',
        ),
        migrations.AddField(
            model_name='book',
            name='date_added',
            field=models.DateTimeField(auto_created=True, auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='book',
            name='edition',
            field=models.CharField(default='Not specify', max_length=200),
        ),
        migrations.AddField(
            model_name='book',
            name='publicatio_date',
            field=models.CharField(default='Unkown', max_length=6),
        ),
        migrations.AddField(
            model_name='book',
            name='publisher',
            field=models.CharField(default='Unknow', max_length=200),
        ),
        migrations.AddField(
            model_name='book',
            name='series',
            field=models.CharField(default='Not specify', max_length=200),
        ),
        migrations.AddField(
            model_name='book',
            name='subtitle',
            field=models.CharField(default='This book has no subtitle', max_length=200),
        ),
        migrations.AddField(
            model_name='book',
            name='summary',
            field=models.CharField(default='No summary', max_length=1024),
        ),
    ]
