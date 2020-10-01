from djongo import models
from datetime import datetime

# Create your models here.
class CovidNews(models.Model):
    description = models.CharField(max_length = 400, default='desc')
    publishedDate = models.CharField(max_length = 200, default='date')
    title = models.CharField(max_length = 200, default='title')
    url = models.CharField(max_length = 200, default='url')

    def __str__(self):
        return self.description

class ArticleDump(models.Model):
    id = models.AutoField(primary_key=True)
    country = models.CharField(max_length = 100, default='')
    addedDate = models.DateTimeField()
    articles = models.JSONField()

    def __str__(self):
        return "Artcile Dump " + str(self.addedDate)
