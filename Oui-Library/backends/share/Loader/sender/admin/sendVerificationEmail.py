from ...otp_verification import OTPStatusEmail

def sendOTP(otp_sent):
    return OTPStatusEmail(otp_sent,admin=True) 