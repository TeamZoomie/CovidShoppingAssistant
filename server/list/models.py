from mongoengine import Document, EmbeddedDocument, fields

class ItemModel(EmbeddedDocument):
    name = fields.StringField(required=True)
    category = fields.StringField(required=True)
    quantity = fields.IntField(required=True)
    checked = fields.BooleanField(required=True)
    
class ListModel(Document):
    idField = fields.IntField(unique=True, required=True)
    name = fields.StringField(default='Weekly')
    date = fields.StringField(default='2020-08-21')
    dueDate = fields.StringField(default='2020-09-29')
    colour = fields.StringField(default='blue')
    items = fields.ListField(fields.EmbeddedDocumentField(ItemModel))
    
    def __str__(self):
        return self.idField