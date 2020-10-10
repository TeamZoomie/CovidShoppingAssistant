'''
Register the ListModel model with the admin page
'''
from django.contrib import admin
from .models import ListModel

admin.register(ListModel)
