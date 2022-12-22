import jwt
from datetime import datetime

from user import db, bcrypt
from user.Functions.otp import send_otp


# Base user model for all types of user
# Every User model can inherit from this model as required
class User(db.Document):
    email = db.EmailField(Required=True, unique=True)
    password = db.StringField(Required=True)
    phone = db.StringField()
    otp = db.IntField()
    resetotp = db.IntField()
    verified = db.BooleanField(default=False)
    createdDate = db.DateTimeField(default=datetime.now())
    meta={'abstract': True}


    # function to encrypt password provided by the user and 
    # send otp to the email address for verification during user creation.
    def createUser(self):
        self.password = bcrypt.generate_password_hash(str(self.password)).decode("ascii")
        self.otp = send_otp(self.email)
        self.save()

    # function to send otp to the user provided email address for verification
    def otp_send(self):
        OTP = send_otp(self.email)
        self.otp = OTP
        self.save()


    # function to check if the password provided by the user is correct
    def checkpassword(self, password):
        return bcrypt.check_password_hash(self.password, str(password))

    # function to send otp to the user provided email address for verification
    def forgetpassword(self):
        OTP = send_otp(self.email)
        self.resetotp = OTP
        self.save()

    # function to change password of the user
    def resetpassword(self, password):
            self.password = bcrypt.generate_password_hash(str(password)).decode("ascii")
            self.resetotp = None
            self.save()

    # function to verify user if otp matched with the one sent to the user
    def verifyUser(self, otp):
        if self.otp == otp:
            self.verified = True
            self.otp = None
            self.save()
            return True
        else:
            return False
    
    # function to check if password reset otp is valid or not
    def checkResetOtp(self, otp):
        if self.resetotp == otp:
            return True
        else:
            return False

    # function to check if user is verified or not
    def isVerified(self):
        if self.verified == True:
            return True
        else:
            return False

    # function to generate auth token for the user
    def generateToken(self):
        token = jwt.encode({"id": str(self.pk)}, "sentimentanalysistoken", algorithm="HS256")
        token_json = {"authToken": token}
        return token_json
