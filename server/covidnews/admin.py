'''
Register this app to the django admin settings.
'''

from django.contrib import admin
from .models import CovidArticles

# Register Model
admin.register(CovidArticles)
