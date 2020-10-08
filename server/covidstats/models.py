#from djongo import models
from mongoengine import Document, fields

class CovidInformation(Document):
    country = fields.StringField(max_length=60)
    cases = fields.IntField()
    todayCases = fields.IntField()
    deaths = fields.IntField()
    todayDeaths = fields.IntField()
    recovered = fields.IntField()
    active = fields.IntField()
    critical = fields.IntField()
    casesPerOneMillion = fields.IntField()
    deathsPerOneMillion = fields.IntField()
    totalTests = fields.IntField()
    testsPerOneMillion = fields.IntField()

    def __str__(self):
        return self.country
