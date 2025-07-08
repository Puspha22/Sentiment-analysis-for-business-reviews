from flask import Flask
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt
import certifi
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Pre-load the sentiment analysis model when the service starts
from .Functions.textprocessing import load_model_and_tokenizer

load_dotenv()

app = Flask(__name__)
cors = CORS(app)

bcrypt = Bcrypt(app)

MONGODB_URI = os.environ.get("MONGODB_URI")
if not MONGODB_URI:
    raise ValueError("MONGODB_URI environment variable is not set!")

app.config["MONGODB_SETTINGS"] = {
    "db": "Service",
    "host": MONGODB_URI,
    "port": 27017,
    "tlsCAFile": certifi.where(),
}

app.secret_key = os.environ.get("FLASK_SECRET_KEY", "dev-secret-key")

db = MongoEngine()
db.init_app(app)

# Load model at startup
print("🚀 Initializing sentiment analysis service...")
try:
    load_model_and_tokenizer()
    print("✅ Service ready to process requests!")
except Exception as e:
    print(f"❌ Failed to initialize service: {e}")
    # Don't raise here - let the service start and handle errors gracefully

from service.Routes import routes