from djongo import models

# Create your models here.
class CovidNews(models.Model):
    description = models.CharField(max_length = 400, default='desc')
    publishedDate = models.CharField(max_length = 200, default='date')
    title = models.CharField(max_length = 200, default='title')
    url = models.CharField(max_length = 200, default='url')

    def __str__(self):
        return self.description
