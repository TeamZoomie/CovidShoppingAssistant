from djongo import models
from datetime import datetime

# Create your models here.
class ArticleDump(models.Model):
    id = models.AutoField(primary_key=True)
    country = models.CharField(max_length = 100, default='')
    addedDate = models.DateTimeField()
    articles = models.JSONField()

    def __str__(self):
        return "Artcile Dump " + str(self.addedDate)
