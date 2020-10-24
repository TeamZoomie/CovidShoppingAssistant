'''
Register the list application with the Django admin page
'''
from django.contrib import admin
from .models import ListModel

admin.register(ListModel)
