'''
Contains information about the model that stores information gathered from
news sites.
'''
from mongoengine import Document, EmbeddedDocument, fields


class SourceField(EmbeddedDocument):
    '''
    Contains fields needed to grab a docuemnt from the NewsApiClient.
    '''
    id = fields.StringField()
    name = fields.StringField()


class ArticleModel(EmbeddedDocument):
    '''
    Contains headers that all articles contain when grabbing them from the
    NewsApiClient.
    '''
    source = fields.EmbeddedDocumentField(SourceField)
    author = fields.StringField()
    title = fields.StringField()
    description = fields.StringField()
    url = fields.StringField()
    urlToImage = fields.StringField()
    publishedAt = fields.StringField()
    content = fields.StringField()


class CovidArticles(Document):
    '''
    Is the base model of the app that stores all information from the
    NewsApiClient.
    '''
    idField = fields.IntField(primary_key=True)
    country = fields.StringField(max_length=100, default='', unique=True)
    addedDate = fields.DateTimeField()
    articles = fields.ListField(fields.EmbeddedDocumentField(ArticleModel))

    def __str__(self):
        return "Artcile Dump " + str(self.addedDate)
