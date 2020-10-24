'''
Resgister the model with the Django settings.
'''
from django.apps import AppConfig


class CovidstatsConfig(AppConfig):
    '''
    Class that is used to initialise the CovidStats app with the settings.
    '''
    name = 'covidstats'
