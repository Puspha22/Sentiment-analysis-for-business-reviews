from marshmallow import Schema, fields
from datetime import datetime
from .base import Service
from service import db

# service model
class Service(Service):
    endPoint = db.StringField()
    filePath = db.StringField()
    text = db.StringField()