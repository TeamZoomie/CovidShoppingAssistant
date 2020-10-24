'''
Contains the LiveTime model and the PopularTimes embedded model
'''
from mongoengine import Document, EmbeddedDocument, fields


class PopularTimes(EmbeddedDocument):
    '''
    An EmeddedDocument that is used to store additional information needed for
    the LiveTime model
    '''
    name = fields.StringField(max_length=50)
    data = fields.ListField()


class LiveTime(Document):
    '''
    Stores information of live data from places that the API receives.
    '''
    place_id = fields.StringField(max_length=50, required=True, unique=True)
    name = fields.StringField(max_length=150)
    populartimes = fields.ListField(fields.EmbeddedDocumentField(PopularTimes))
    current_popularity = fields.IntField()
