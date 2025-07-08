from flask import request
import logging

from user import app
from user.Models.normaluser import NormalUser
from user.Functions.responsehelper import *

logging.basicConfig(level=logging.INFO)
print("verifyuser.py loaded")

# routes to verify normal user
# returns authentication token after normal user is verified
# email and otp must be porvided while making the request  
@app.route("/verifyuser", methods=["POST"])
def verifyuser():
    data = request.get_json()
    logging.info("Received data: %s", data)
    email = data["email"]
    otp = data["otp"]
    user = NormalUser.objects(email=email).first()
    if user:
        logging.info("User found: %s", user)
        logging.info("User.verified: %s User.resetotp: %s Provided otp: %s", user.verified, user.resetotp, otp)
        if user.resetotp == otp:  # Check against resetotp for password reset
            user.verified = True
            # Don't clear resetotp here - it will be cleared after successful password reset
            user.save()
            return successResponse("User verified successfully")
        else:
            return errorResponse("Invalid OTP", 400)
    else:
        return errorResponse("User not found", 404)
