import random
import smtplib
from .responsehelper import responseHelper


# function which generates random otp and send it to a provided phone number
# function uses fastsms api to send otp
def send_otp(email):
        OTP = random.randrange(100000,999999,1)
        msg = "Dear Sir/Madam,\n\n"+"ATTENTION : Please do not reply to this email.This mailbox is not monitored and you will not receive a response.\n\n"+"Your OTP for Sentiment Analysis system is " + str(OTP)
        try : 
            s = smtplib.SMTP('smtp.gmail.com', 587)
            s.starttls()
            s.login("sentimentanalysisncit@gmail.com", " iltnhprrqhjgaxmm")
            s.sendmail('&&&&&&&&&&&', email, msg)
            return OTP
        except Exception as err:
            print(err)
            error = {"title": "Unable to send otp", "detail": "Please provide a valid email address"}
            return responseHelper(500, "Internal Server Error", None, error, None)
