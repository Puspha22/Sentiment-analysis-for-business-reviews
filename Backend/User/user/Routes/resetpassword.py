from flask import request
from marshmallow import ValidationError
import logging

from user import app
from user.Models.normaluser import NormalUser, ResetPasswordSchema
from user.Functions.responsehelper import *

logging.basicConfig(level=logging.INFO)

# route to change password of the normal user
# phone, password and otp must be provided while making the request
@app.route("/resetpassword", methods=["POST"])
def resetpassword():
    data = request.get_json()
    logging.info("Reset password received data: %s", data)
    try:
        schema = ResetPasswordSchema()
        new_user = schema.load(data)
        logging.info("Schema validation passed")
    except ValidationError as err:
        logging.error("Schema validation failed: %s", err.messages)
        return errorResponse(err.messages)
    email = data["email"]
    password = data["password"]
    otp = data["otp"]
    logging.info("Looking for user with email: %s", email)
    user = NormalUser.objects(email=email).first()
    if user:
        logging.info("User found, checking OTP: %s", otp)
        if user.checkResetOtp(otp):
            logging.info("OTP check passed, resetting password")
            user.resetpassword(password)
            return successResponse("Password Changed")
        else:
            logging.error("Invalid OTP")
            return errorResponse("Invalid OTP", 400)
    else:
        logging.error("User not found")
        return errorResponse("User not found", 404)
