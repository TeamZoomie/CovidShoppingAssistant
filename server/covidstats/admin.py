'''
Register the CovidInformation model with the Django admin page.
'''
from django.contrib import admin
from .models import CovidInformation

admin.register(CovidInformation)
