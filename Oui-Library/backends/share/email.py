
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import os
from dotenv import load_dotenv
load_dotenv()

class SendEmail:
    def __init__(self,to_email, **kwargs):
        self.sender_email = os.getenv('EMAIL_HOST_USER')
        self.sender_password = os.getenv('EMAIL_HOST_PASSWORD')  # Replace with your password
        self.smtp_server = os.getenv('EMAIL_HOST')  
        self.smtp_port = os.getenv('EMAIL_PORT')
        self.msg = MIMEMultipart('alternative')
        self.msg['From'] = self.sender_email
        self.msg['To'] = to_email
        

        # Attach HTML content
      

    def SendAccountSuccessEmail(self,  OTP):
        from .Loader.sender.user.sendOTPVerificationSuccess import sendOTPStatus
        html_content, subject = sendOTPStatus(OTP),"OUI Library Management Account Setup"
        self.html_part = MIMEText(html_content, 'html')
        self.msg['Subject'] = subject
        self.msg.attach(self.html_part)
        self.Send()
            
    def Send(self):
        try:
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.sender_email, self.sender_password)
            server.sendmail(self.sender_email, self.msg['To'], self.msg.as_string())
            server.quit()
            print("Email sent successfully!")
        except Exception as e:
            print("Failed to send email:", str(e))
            
    def SendOTPSuccessEmail(self,  OTP):
        from .Loader.sender.user.sendVerificationEmail import sendOTP
        html_content, subject = sendOTP(OTP),"OUI Library Management Account Setup"
        self.html_part = MIMEText(html_content, 'html')
        self.msg['Subject'] = subject
        self.msg.attach(self.html_part)
        self.Send()
       

# Usage example

