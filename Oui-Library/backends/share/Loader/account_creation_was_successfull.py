# Assuming you have the OTP stored in a variable na

# HTML content with dynamic OTP insertion
def createContent(otp):
    return """
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #9c27b0; /* Purple */
            text-align: center;
        }
        p {
            color: #ff9800; /* Amber */
        }
        .otp {
            font-weight: bold;
        }
        .thanks {
            color: #333333;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>OUI Library System</h1>
        <p>This email is sent from OUI Library Management System.</p>
        <p>Account created successfully.</p>
        <p>Verify your account with this OTP: <span class="otp">
        """ + otp + """
        </span>
        </p>
        <p class="thanks">Thanks from OUI Library Management Team</p>
    </div>
</body>
</html>
"""
