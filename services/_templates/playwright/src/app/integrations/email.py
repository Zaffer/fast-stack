"""Utility functions like sending emails and password reset
"""
import logging
import os
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any, Dict, Optional

from mailjet_rest import Client

from app.core.config import settings



def send_test_email():
    mailjet = Client(auth=(settings.MAILJET_API_KEY,settings.MAILJET_API_SECRET), version='v3.1')
    data = {
    'Messages': [
        {
        "From": {
            "Email": "info@yoursite.io",
            "Name": "Info"
        },
        "To": [
            {
            "Email": "info@gmail.com",
            "Name": "info"
            }
        ],
        "Subject": "Greetings from Mailjet.",
        "TextPart": "My first Mailjet email",
        "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='YOUR SITE'>Mailjet</a>!</h3><br />May the delivery force be with you!",
        "CustomID": "AppGettingStartedTest"
        }
    ]
    }
    result = mailjet.send.create(data=data)
    return result
