from mongoengine import Document, EmbeddedDocument, fields

class SourceField(EmbeddedDocument):
    id = fields.StringField()
    name = fields.StringField()


class ArticleModel(EmbeddedDocument):
    source = fields.EmbeddedDocumentField(SourceField)
    author = fields.StringField()
    title = fields.StringField()
    description = fields.StringField()
    url = fields.StringField()
    urlToImage = fields.StringField()
    publishedAt = fields.StringField()
    content = fields.StringField()

# Create your models here.
class CovidArticles(Document):
    idField = fields.IntField(primary_key=True)
    country = fields.StringField(max_length=100, default='')
    addedDate = fields.DateTimeField()
    articles = fields.ListField(fields.EmbeddedDocumentField(ArticleModel))

    def __str__(self):
        return "Artcile Dump " + str(self.addedDate)
