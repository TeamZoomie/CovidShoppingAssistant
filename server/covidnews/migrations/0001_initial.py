# Generated by Django 3.1 on 2020-09-07 11:52

from django.db import migrations, models
import django_mysql.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CovidNews',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('version', models.CharField(max_length=60)),
                ('json', django_mysql.models.JSONField(default=dict)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]