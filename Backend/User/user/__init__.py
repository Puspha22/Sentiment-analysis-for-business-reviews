from flask import Flask
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt
import certifi
from flask_cors import CORS
import os
import logging
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
cors = CORS(app)

bcrypt = Bcrypt(app)

MONGODB_URI = os.getenv("MONGODB_URI")
if not MONGODB_URI:
    logging.error("MONGODB_URI environment variable is not set!")
    MONGODB_URI = ""  # fallback to empty string or handle as needed
app.config["MONGODB_SETTINGS"] = {
    "db": "User",
    "host": MONGODB_URI,
    "port": 27017,
    "tlsCAFile": certifi.where(),
}

app.secret_key = os.environ.get("FLASK_SECRET_KEY", "dev-secret-key")

db = MongoEngine()
db.init_app(app)

from user.Routes import signup, verifyuser, login, resetpassword, profile, forgetpassword