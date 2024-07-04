# utils.py

import os
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from django.conf import settings

SCOPES = ["https://www.googleapis.com/auth/drive"]


def upload_to_google_drive(file_path, file_name):
    credentials = service_account.Credentials.from_service_account_file(
        settings.GOOGLE_OAUTH2_CLIENT_SECRETS_FILE, scopes=SCOPES
    )
    service = build("drive", "v3", credentials=credentials)

    file_metadata = {
        "name": file_name,
        "parents": [
            "folder_id"
        ],  # Optional: Specify the folder ID where you want to upload the file
    }
    media = MediaFileUpload(file_path, resumable=True)
    file = (
        service.files()
        .create(body=file_metadata, media_body=media, fields="id")
        .execute()
    )
    print("File ID:", file.get("id"))
