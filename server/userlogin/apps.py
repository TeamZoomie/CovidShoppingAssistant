'''
Register the userlogin app with the django settings.
'''
from django.apps import AppConfig


class UserloginConfig(AppConfig):
    '''
    Registers the userlogin app with the settings so that the app is loaded.
    '''
    name = 'userlogin'
