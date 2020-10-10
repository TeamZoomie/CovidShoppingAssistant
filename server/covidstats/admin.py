'''
Register the CovidInformation model with the admin page.
'''
from django.contrib import admin
from .models import CovidInformation

admin.register(CovidInformation)
