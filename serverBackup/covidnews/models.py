from django.db import models
from jsonfield import JSONField

# Create your models here.
class NewsModel(models.Model):
    number = models.CharField()
    json = JSONField()
