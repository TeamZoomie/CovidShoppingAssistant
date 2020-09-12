from django.db import models

# Create your models here.
class CovidNews(models.Model):
    version = models.CharField(max_length=60)

    def __str__(self):
        return self.version
