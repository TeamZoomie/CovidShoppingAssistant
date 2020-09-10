from django_mysql.models import Model, JSONField
from django.db.models import CharField

# Create your models here.
class CovidNews(Model):
    version = CharField(max_length=60)
    json = JSONField()

    def __str__(self):
        return self.version
