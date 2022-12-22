from flask import request
from marshmallow import ValidationError

from user import app
from user.Models.normaluser import NormalUser, ResetPasswordSchema
from user.Functions.responsehelper import *


# route to change password of the normal user
# phone, password and otp must be provided while making the request
@app.route("/resetpassword", methods=["POST"])
def resetpassword():
    data = request.get_json()
    try:
        schema = ResetPasswordSchema()
        new_user = schema.load(data)
    except ValidationError as err:
        return errorResponse(err.messages)
    email = data["email"]
    password = data["password"]
    otp = data["otp"]
    user = NormalUser.objects(email=email).first()
    if user:
        if user.checkResetOtp(otp):
            user.resetpassword(password)
            return successResponse("Password Changed")
        else:
            return errorResponse("Invalid OTP", 400)
    else:
        return errorResponse("User not found", 404)
