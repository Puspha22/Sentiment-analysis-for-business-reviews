from user import app
from flask import request
from user.Models.normaluser import NormalUser, EmailSchema
from user.Functions.responsehelper import *
from marshmallow import ValidationError


# routes to be called while normal user forgets the password
# sends password reset otp on normal users email on successful request
# valid email must be provided while making the request
@app.route("/forgetpassword", methods=["POST"])
def forgetpassword():
    data = request.get_json()
    if "email" in data and data["email"] is not None:
        email = data["email"]
        user = NormalUser.objects(email=email).first()
        if user:
            user.forgetpassword()
            return successResponse("Password Reset OTP Sent")
        else:
            return errorResponse("User not found", 404)
    else:
        return errorResponse("Please provide email", 400)
