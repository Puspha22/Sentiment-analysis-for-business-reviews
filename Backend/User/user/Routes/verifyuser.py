from flask import request

from user import app
from user.Models.normaluser import NormalUser
from user.Functions.responsehelper import *


# routes to verify normal user
# returns authentication token after normal user is verified
# email and otp must be porvided while making the request  
@app.route("/verifyuser", methods=["POST"])
def verifyuser():
    data = request.get_json()
    if "email" in data and "otp" in data and data["email"] is not None and data["otp"] is not None:
        email = data["email"]
        otp = data["otp"]
        user = NormalUser.objects(email=email).first()
        if user:
            if user.verified == False:
                if user.otp == otp:
                    user.verified = True
                    user.otp = None
                    user.save()
                    token = user.generateToken()
                    return successWithResponse(token, "User Verified")
                else:
                    return errorResponse("Invalid OTP", 400)
            else:
                return errorResponse("User already verified", 400)
        else:
            return errorResponse("User not found", 404)
    else:
        return errorResponse("Please provide email and otp", 400)
