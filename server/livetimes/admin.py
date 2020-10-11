'''
Register the LiveTime model with the admin page.
'''
from django.contrib import admin
from .models import LiveTime

admin.register(LiveTime)
