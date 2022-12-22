from marshmallow import Schema, fields, ValidationError

from .base import User
from user import db, bcrypt
from user.Functions.otp import send_otp


# Function to validate the otp
def validate_otp(otp):
    if len(str(otp)) != 6:
        raise ValidationError("Invalid OTP")
    elif not str(otp).isdigit():
        raise ValidationError("Invalid OTP")

# Function to validate the password
def validate_password(password):
    if len(password) < 6:
        raise ValidationError("Password must be atleast 6 characters long")
    elif len(password) > 20:
        raise ValidationError("Password must be less than 20 characters long")
    elif not any(char.isdigit() for char in password):
        raise ValidationError("Password must contain atleast one digit")
    elif not any(char.isupper() for char in password):
        raise ValidationError("Password must contain atleast one uppercase letter")
    elif not any(char.islower() for char in password):
        raise ValidationError("Password must contain atleast one lowercase letter")
    elif not any(char.isalpha() for char in password):
        raise ValidationError("Password must contain atleast one letter")

# Function to validate the phone number
def validate_phone(phone):
    if len(phone) != 10:
        raise ValidationError("Invalid phone number") 
    elif not phone.isdigit():
        raise ValidationError("Invalid phone number")
    elif phone[0] != '9':
        raise ValidationError("Invalid phone number")


class NormalUserSchema(Schema):
    email = fields.Email(required=True, unique=True)
    password = fields.Str(required=True, validate=validate_password)

class EmailSchema(Schema):
    email = fields.Email(required=True, unique=True)

class ResetPasswordSchema(NormalUserSchema):
    email = fields.Email(required=True, unique=True)
    otp = fields.Int(required=True, validate=validate_otp)
    password = fields.Str(required=True, validate=validate_password)


# noramal user model which inherits from base user model   
class NormalUser(User):
    firstName = db.StringField()
    lastName=db.StringField()
    
    def userdetails(self):
        return {
            "id": str(self.pk),
            "firstName" : self.firstName,
            "lastName" : self.lastName,
            "phone": self.phone,
            "email": self.email,
        }

    # function to get user profile in dictionary format
    def profile(self):
        return {
            "id" : str(self.pk),
            "firstName": self.firstName,
            "lastName":self.lastName,
            "email": self.email,
            "phone": self.phone,
            "verified": self.verified,
            "createdDate": str(self.createdDate)
        }

    # function to update user profile like password, firstName, lastName
    # email, phone, address as required by the user.
    def updateProfile(self, data):
        if "password" in data and data["password"] is not None:
            if self.checkpassword(data["oldPassword"]): 
                self.password =  bcrypt.generate_password_hash(str(data["password"])).decode("ascii")
            else:
                return False
        if "firstName" in data and data["firstName"] is not None:
            self.firstName = data["firstName"]
        if "lastName" in data and data["lastName"] is not None:
            self.lastName = data["lastName"]
        if "email" in data and data["email"] is not None:
            if self.email != data["email"]:
                self.otp = send_otp(data["email"])
                self.email = data["email"]
                self.verified = False
        if "phone" in data and data["phone"] is not None:
            self.phone = data["phone"]
        self.save()
        return self.profile()
