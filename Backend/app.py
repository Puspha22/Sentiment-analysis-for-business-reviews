from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_mongoengine import MongoEngine
import os

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# MongoDB config
app.config["MONGODB_SETTINGS"] = {
    "db": "User",
    "host": os.getenv("MONGODB_URI"),
    "port": 27017,
}

db = MongoEngine()
db.init_app(app)

# --- User Model ---
class User(db.Document):
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True)
    verified = db.BooleanField(default=False)
    # Add other fields as needed

# --- Auth Routes (register, login, forgot/reset password) ---
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({"message": "Email and password required"}), 400
    if User.objects(email=email).first():
        return jsonify({"message": "User already exists"}), 400
    hashed = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(email=email, password=hashed, verified=True)
    user.save()
    return jsonify({"message": "User registered successfully"})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.objects(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Invalid credentials"}), 401
    return jsonify({"message": "Login successful", "email": user.email})

import random

@app.route('/forgetpassword', methods=['POST'])
def forget_password():
    data = request.get_json()
    email = data.get('email')
    user = User.objects(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    otp = random.randint(100000, 999999)
    user.otp = otp
    user.save()
    # In production, send OTP via email. For now, return it for testing.
    return jsonify({"message": "OTP sent", "otp": otp})

@app.route('/resetpassword', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    otp = int(data.get('otp'))
    password = data.get('password')
    user = User.objects(email=email).first()
    if not user or user.otp != otp:
        return jsonify({"message": "Invalid OTP or user"}), 400
    user.password = bcrypt.generate_password_hash(password).decode('utf-8')
    user.otp = None
    user.save()
    return jsonify({"message": "Password reset successful"})

# --- Sentiment Analysis Route ---
@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    # Load model and predict sentiment here
    return jsonify({"message": "Analyze endpoint stub"})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0") 