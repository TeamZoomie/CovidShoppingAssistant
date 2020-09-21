from djongo import models

# Create your models here.

class ItemModel(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=160)
    quantity = models.IntegerField()
    checked = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name
    

class ListModel(models.Model):
    idField = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100, default='Weekly')
    date = models.CharField(max_length=60, default='2020-08-21')
    dueDate = models.CharField(max_length=60, default='2020-09-29')
    colour = models.CharField(max_length=100, default='blue')
    items = models.ManyToManyField(ItemModel)

    def __str__(self):
        return self.idField
