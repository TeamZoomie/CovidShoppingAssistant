from djongo import models

# Create your models here.

class ItemModel(models.Model):
    name = models.CharField(max_length=100, default='Apple')
    category = models.CharField(max_length=160, default='Fruit')
    quantity = models.IntegerField(default=0)
    checked = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name
    
    class Meta:
        abstract = True
    

class ListModel(models.Model):
    idField = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100, default='Weekly')
    date = models.CharField(max_length=60, default='2020-08-21')
    dueDate = models.CharField(max_length=60, default='2020-09-29')
    colour = models.CharField(max_length=100, default='blue')
    items = models.EmbeddedField(model_container=ItemModel)
    
    objects = models.DjongoManager()

    def __str__(self):
        return self.idField
