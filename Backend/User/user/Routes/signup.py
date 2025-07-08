from flask import request
from marshmallow import ValidationError

from user import app
from user.Models.normaluser import NormalUser, NormalUserSchema
from user.Functions.responsehelper import *  


# routes to singup normal user into the system
# email , password must be provided in json format while making request into the route
# email , password should not be null value
# returns a json response with status code 200 if user is successfully created
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    # try:
    #     schema = NormalUserSchema()
    #     new_user = schema.load(data)
    # except ValidationError as err:
    #     return errorResponse(err.messages)
    email = data["email"]
    password = data["password"]
    user = NormalUser.objects(email=email).first()
    if user:
        if user.verified==True:
            return errorResponse("User already exist", 422)
        else:
            user.delete()
            userNew = NormalUser(email=email, password=password)
            userNew.createUser()
            userNew.save()
            return successResponse("User Created")
    else:
        user = NormalUser(email=email, password=password)
        user.createUser()
        user.save()
        return successResponse("User Created")
