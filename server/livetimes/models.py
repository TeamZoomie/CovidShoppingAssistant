from mongoengine import Document, EmbeddedDocument, fields

class PopularTimes(EmbeddedDocument):
    name = fields.StringField(max_length=50)
    data = fields.ListField()

class LiveTime(Document):
    place_id = fields.StringField(max_length=50, required=True, unique=True)
    name = fields.StringField(max_length=150)    
    populartimes = fields.ListField(fields.EmbeddedDocumentField(PopularTimes))
    current_popularity = fields.IntField()