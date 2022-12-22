from flask import request
from marshmallow import ValidationError

from user import app
from user.Models.normaluser import NormalUser, NormalUserSchema
from user.Functions.responsehelper import *


# route to login normal user and get access token
# email and password must be provided while making request
# return authentication token on successful request
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if "email" in data and "password" in data and data["email"] is not None and data["password"] is not None:
        email = data["email"]
        password = data["password"]
        user = NormalUser.objects(email=email).first()
        if user:
            if user.checkpassword(password):
                if user.isVerified():
                    token = user.generateToken()
                    return successWithResponse(token, "User Logged In")
                else:
                    user.otp_send()
                    return errorResponse("User not verified, OTP sent", 400)
            else:
                return errorResponse("Invalid Password", 400)
        else:
            return errorResponse("User not found", 404)
    else:
        return errorResponse("Please provide email and password")
