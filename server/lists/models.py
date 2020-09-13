from django.db import models

# Create your models here.
class ListModel(models.Model):
    idField = models.IntegerField()

    def __str__(self):
        return self.idField
