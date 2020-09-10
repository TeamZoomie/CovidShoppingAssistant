from django.db import models

class CovidAustralia(models.Model):
    country = models.CharField(max_length=60)
    cases = models.IntegerField()
    todayCases = models.IntegerField()
    deaths = models.IntegerField()
    todayDeaths = models.IntegerField()
    recovered = models.IntegerField()
    active = models.IntegerField()
    critical = models.IntegerField()
    casesPerOneMillion = models.IntegerField()
    deathsPerOneMillion = models.IntegerField()
    totalTests = models.IntegerField()
    testsPerOneMillion = models.IntegerField()

    def __str__(self):
        return self.country
