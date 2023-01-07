import json
import logging
import os
import urllib.parse
import requests

from typing import Optional, Dict, List, Type
from fastapi import HTTPException, Depends, Security, Request
from fastapi.security import SecurityScopes, HTTPBearer, HTTPAuthorizationCredentials
from fastapi.security import (
    OAuth2,
    OAuth2PasswordBearer,
    OAuth2AuthorizationCodeBearer,
    OpenIdConnect,
)
from fastapi.openapi.models import OAuthFlows
from pydantic import BaseModel, Field, ValidationError
from jose import jwt


class Auth0User(BaseModel):
    id: str = Field(..., alias="sub")
    permissions: Optional[List[str]]
    email: Optional[str] = Field(None, alias="email")
    given_name: str = Field(None, alias="given_name")
    family_name: str = Field(None, alias="family_name")
    nickname: str = Field(None, alias="nickname")
    name: str = Field(None, alias="name")
    picture: str = Field(None, alias="picture")


class Auth0UnauthenticatedException(HTTPException):
    def __init__(self, **kwargs):
        super().__init__(401, **kwargs)


class Auth0UnauthorizedException(HTTPException):
    def __init__(self, **kwargs):
        super().__init__(403, **kwargs)


class HTTPAuth0Error(BaseModel):
    detail: str


unauthenticated_response: Dict = {401: {"model": HTTPAuth0Error}}
unauthorized_response: Dict = {403: {"model": HTTPAuth0Error}}
security_responses: Dict = {**unauthenticated_response, **unauthorized_response}


class Auth0HTTPBearer(HTTPBearer):
    async def __call__(self, request: Request):

        return await super().__call__(request)


class OAuth2SchemeBearer(OAuth2):
    def __init__(
        self,
        authorizationUrl: str,
        scopes: Dict[str, str] = {},
        scheme_name: Optional[str] = None,
        auto_error: bool = True,
    ):
        flows = OAuthFlows(
            implicit={"authorizationUrl": authorizationUrl, "scopes": scopes}
        )
        super().__init__(flows=flows, scheme_name=scheme_name, auto_error=auto_error)

    async def __call__(self, request: Request) -> Optional[str]:

        return None


class Auth0:
    def __init__(
        self,
        domain: str,
        api_audience: str,
        scopes: Dict[str, str] = {},
        auto_error: bool = True,
        scope_auto_error: bool = True,
        email_auto_error: bool = False,
        auth0user_model: Type[Auth0User] = Auth0User,
    ):
        self.domain = domain
        self.audience = api_audience
        self.auto_error = auto_error
        self.scope_auto_error = scope_auto_error
        self.email_auto_error = email_auto_error
        self.auth0_user_model = auth0user_model
        self.algorithms = ["RS256"]
        self.jwks: Dict = requests.get(f"https://{domain}/.well-known/jwks.json").json()

        authorization_url_qs = urllib.parse.urlencode({"audience": api_audience})
        authorization_url = f"https://{domain}/authorize?{authorization_url_qs}"
        self.oauth_scheme = OAuth2SchemeBearer(
            authorizationUrl=authorization_url,
            scopes=scopes,
            scheme_name="Auth0ImplicitBearer",
        )
        self.password_scheme = OAuth2PasswordBearer(
            tokenUrl=f"https://{domain}/oauth/token", scopes=scopes
        )
        self.authcode_scheme = OAuth2AuthorizationCodeBearer(
            authorizationUrl=authorization_url,
            tokenUrl=f"https://{domain}/oauth/token",
            scopes=scopes,
        )
        self.oidc_scheme = OpenIdConnect(
            openIdConnectUrl=f"https://{domain}/.well-known/openid-configuration"
        )

    async def get_user(
        self,
        security_scopes: SecurityScopes,
        creds: Optional[HTTPAuthorizationCredentials] = Depends(
            Auth0HTTPBearer(auto_error=False)
        ),
    ) -> Optional[Auth0User]:

        if creds is None:
            if self.auto_error:
                raise HTTPException(
                    403, detail="Unauthorized user (missing bearer token)"
                )
            else:
                return None

        token = creds.credentials
        payload: Dict = {}
        try:
            unverified_header = jwt.get_unverified_header(token)
            rsa_key = {}
            for key in self.jwks["keys"]:
                if key["kid"] == unverified_header["kid"]:
                    rsa_key = {
                        "kty": key["kty"],
                        "kid": key["kid"],
                        "use": key["use"],
                        "n": key["n"],
                        "e": key["e"],
                    }
            if rsa_key:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=self.algorithms,
                    audience=self.audience,
                    issuer=f"https://{self.domain}/",
                )
            else:
                if self.auto_error:
                    raise jwt.JWTError

        except jwt.ExpiredSignatureError:
            if self.auto_error:
                raise Auth0UnauthenticatedException(detail="Token is expired")
            else:
                return None

        except jwt.JWTClaimsError:
            if self.auto_error:
                raise Auth0UnauthenticatedException(
                    detail="Invalid token claims (please check your auth0 details)"
                )
            else:
                return None

        except jwt.JWTError:
            if self.auto_error:
                raise Auth0UnauthenticatedException(detail="Token format is wrong")
            else:
                return None

        except Exception as e:
            logging.error(f'Handled exception decoding token: "{e}"')
            if self.auto_error:
                raise Auth0UnauthenticatedException(detail="Error decoding token")
            else:
                return None

        if self.scope_auto_error:
            token_scope_str: str = payload.get("scope", "")

            if isinstance(token_scope_str, str):
                token_scopes = token_scope_str.split()

                for scope in security_scopes.scopes:
                    if scope not in token_scopes:
                        raise Auth0UnauthorizedException(
                            detail=f'Missing "{scope}" scope',
                            headers={
                                "WWW-Authenticate": f'Bearer scope="{security_scopes.scope_str}"'
                            },
                        )
            else:
                raise Auth0UnauthorizedException(
                    detail='Token "scope" field must be a string'
                )

        try:
            user = self.auth0_user_model(**payload)

            if self.email_auto_error and not user.email:
                raise Auth0UnauthorizedException(detail=f"Missing email")

            return user

        except ValidationError as e:
            logging.error(f'Handled exception parsing Auth0User: "{e}"')
            if self.auto_error:
                raise Auth0UnauthorizedException(detail="Error parsing Auth0User")
            else:
                return None

        return None
