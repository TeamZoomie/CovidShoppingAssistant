from django.db import models
import requests


# Create your models here.
class CovidStatsAustralia(models.Model):
    data = requesrs.get('https://coronavirus-19-api.herokuapp.com/countries/Australia')
    cases = models.IntegerField(data.json()['cases'])
    todayCases = models.IntegerField(data.json()['todayCases'])
    deaths = models.IntegerField(data.json()['deaths'])
    todayDeaths = models.IntegerField(data.json()['todayDeaths'])
    recovered = models.IntegerField(data.json()['recovered'])
    active = models.IntegerField(data.json()['active'])
    critical = models.IntegerField(data.json()['critical'])
    casesPerOneMillion = models.IntegerField(data.json()['casesPerOneMillion'])
    deathsPerOneMillion = models.IntegerField(data.json()['deathsPerOneMillion'])
    totalTests = models.IntegerField(data.json()['totalTests'])
    testsPerOneMillion = models.IntegerField(data.json()['testsPerOneMillion'])

    def __str__(self):
        return self.cases
