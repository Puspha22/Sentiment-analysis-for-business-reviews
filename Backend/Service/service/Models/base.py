from datetime import datetime

from service import db

# service model
class Service(db.Document):
    user = db.DictField()
    endPoint = db.StringField()
    filePath = db.StringField()
    createdDate = db.DateTimeField(default=datetime.now())
    meta={'abstract': True}

    # function to save file paths in the database
    def saveFilePath(self, filePath):
        self.filePath = filePath
        self.save()

    
