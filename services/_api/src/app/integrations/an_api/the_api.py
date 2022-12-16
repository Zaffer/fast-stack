import base64
import json
import os

from app.core.session import get_session
from loguru import logger
from oauthlib.oauth2 import LegacyApplicationClient
from requests.auth import HTTPBasicAuth
from requests_oauthlib import OAuth2Session

import logging



from http.client import HTTPConnection

# # you need to initialize logging, otherwise you will not see anything from requests
# # WARN prints token to logs
# HTTPConnection.debuglevel = 1
# logging.basicConfig() 
# logging.getLogger().setLevel(logging.DEBUG)
# requests_log = logging.getLogger("urllib3")
# requests_log.setLevel(logging.DEBUG)
# requests_log.propagate = True



async def get_the_api_session() -> OAuth2Session:

    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    redis = await get_session()

    async def token_saver(token: str = "{{}}"):
        await redis.set("API:THE_API:TOKEN", token)

    token_url = ""
    client_id = ""
    query_username = base64.b64encode("".encode()).decode()
    query_password = base64.b64encode("".encode()).decode()
    basic_username = ""
    basic_password = ""
    auth = HTTPBasicAuth(basic_username, basic_password)

    client = LegacyApplicationClient(client_id=client_id)

    oauth = OAuth2Session(
        client=client,
        auto_refresh_url=token_url,
        token_updater=token_saver,
    )

    token = await redis.get("API:THE_API:TOKEN")

    if token:
        oauth.token = json.loads(token)
    else:
        token = oauth.fetch_token(
            token_url=token_url,
            auth=auth,
            username=query_username,
            password=query_password,
        )
        await token_saver(json.dumps(token))
    return oauth


async def call_protected():
    protected_url = ""
    headers = {"Content-Type": "application/json"}
    payload = {
        "start": "01/12/2022 00:00",
        "end": "01/12/2022 23:50",
    }

    oauth = await get_the_api_session()

    response = oauth.request("POST", protected_url, headers=headers, data=payload)

    logger.info(response.json())
