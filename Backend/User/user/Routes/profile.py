from flask import request
import jwt

from user import app
from user.Models.normaluser import NormalUser
from user.Functions.responsehelper import *


# route can be called to get and update profile of a normal user
@app.route("/profile", methods=["GET", "PUT"])
def profile():
    header = request.headers
    if "authToken" in header:
        token = header["authToken"]
        try:
            id = jwt.decode(token, "sentimentanalysistoken", algorithms="HS256")["id"]
        except:
            return errorResponse("Invalid token", 400)
        user = NormalUser.objects(pk=id).first()
        if user:
            if request.method == "GET":
                return successWithResponse(user.profile(), "User Profile Found")
            elif request.method == "PUT":
                data = request.get_json()
                if (user.updateProfile(data))==False:
                    return errorResponse("Invalid data", 400)
                return successResponse("Profile Updated")
        else:
            return errorResponse("User not found", 404)
