from flask import Flask
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt
import certifi
from flask_cors import CORS
import os


app = Flask(__name__)
cors = CORS(app)

bcrypt = Bcrypt(app)


app.config["MONGODB_SETTINGS"] = {
    "db": "Service",
    "host": "mongodb+srv://Sandesh:Sandesh%40171238@cluster0.ogofx.mongodb.net/test",
    "port": 27017,
    "tlsCAFile": certifi.where(),
}


db = MongoEngine()
db.init_app(app)

from service.Routes import routes