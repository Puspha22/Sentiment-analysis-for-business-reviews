import random
import smtplib
import os
from .responsehelper import responseHelper
from dotenv import load_dotenv

load_dotenv()

# function which generates random otp and send it to a provided phone number
# function uses fastsms api to send otp
def send_otp(email):
        OTP = random.randrange(100000,999999,1)
        msg = "Dear Sir/Madam,\n\n"+"ATTENTION : Please do not reply to this email.This mailbox is not monitored and you will not receive a response.\n\n"+"Your OTP for Sentiment Analysis system is " + str(OTP)
        smtp_host = os.environ.get('EMAIL_HOST', 'smtp.gmail.com')
        smtp_port = int(os.environ.get('EMAIL_PORT', 587))
        smtp_user = os.environ.get('EMAIL_USER')
        smtp_pass = os.environ.get('EMAIL_PASS')
        try : 
            s = smtplib.SMTP(smtp_host, smtp_port)
            s.starttls()
            s.login(smtp_user, smtp_pass)
            s.sendmail(smtp_user, email, msg)
            return OTP
        except Exception as err:
            print(err)
            error = {"title": "Unable to send otp", "detail": "Please provide a valid email address"}
            return responseHelper(500, "Internal Server Error", None, error, None)
