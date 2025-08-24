import functools
import json
from urllib.request import urlopen

from authlib.integrations.flask_oauth2 import ResourceProtector, signals
from authlib.jose.rfc7517.jwk import JsonWebKey
from authlib.oauth2 import OAuth2Error
from authlib.oauth2.rfc6749 import HttpRequest, MissingAuthorizationError
from authlib.oauth2.rfc7523 import JWTBearerTokenValidator
from flask import _app_ctx_stack, flash, redirect
from flask import request as _req
from flask import session
from loguru import logger

from app.core.config_mfa import get_settings
from app.main import oauth

settings = get_settings(env="mfa.env")

oauth.register(
    "auth0",
    client_id=settings.AUTH0_CLIENT_ID,
    client_secret=settings.AUTH0_CLIENT_SECRET,
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f"https://{settings.AUTH0_DOMAIN}/.well-known/openid-configuration",
)


class Auth0JWTBearerTokenValidator(JWTBearerTokenValidator):
    """Validator as per Auth0 requirements"""

    def __init__(self, domain, audience):
        issuer = f"https://{domain}/"
        jsonurl = urlopen(f"{issuer}.well-known/jwks.json")
        public_key = JsonWebKey.import_key_set(json.loads(jsonurl.read()))
        super(Auth0JWTBearerTokenValidator, self).__init__(public_key)
        self.claims_options = {
            "exp": {"essential": True},
            "aud": {"essential": True, "value": audience},
            "iss": {"essential": True, "value": issuer},
        }


validator = Auth0JWTBearerTokenValidator(
    "your_app.eu.auth0.com", "audience_goes_here"
)


class ResourceProtectorSession(ResourceProtector):
    # def parse_request_authorization(self, request):
    #     """Parse the token and token validator from session.
    #     This method overrides the default one that gets it from header instead.

    #     :return: validator, token_string
    #     :raise: MissingAuthorizationError
    #     :raise: UnsupportedTokenTypeError
    #     """
    #     user = session.get("user")
    #     if not user:
    #         raise MissingAuthorizationError(
    #             self._default_auth_type, self._default_realm
    #         )
    #     token = user.get("id_token")
    #     if not token:
    #         raise MissingAuthorizationError(
    #             self._default_auth_type, self._default_realm
    #         )
    #     auth = f"Bearer {token}"

    #     # https://tools.ietf.org/html/rfc6749#section-7.1
    #     token_parts = auth.split(None, 1)
    #     if len(token_parts) != 2:
    #         raise UnsupportedTokenTypeError(
    #             self._default_auth_type, self._default_realm
    #         )

    #     logger.info(f"token parts: {token_parts}")
    #     token_type, token_string = token_parts
    #     validator = self.get_token_validator(token_type)
    #     return validator, token_string

    # def raise_error_response(self, error):
    #     """Override methode to send user to home on auth error

    #     :param error: OAuth2Error
    #     :return: redirect
    #     """
    #     flash(f"{error.status_code}: {json.dumps(dict(error.get_body()))}, {error.get_headers()}", "danger")
    #     return redirect("/", 307)

    def redirect_to_home(self, error):
        """Navigate user to home and flash error

        :param error: OAuth2Error
        :return: redirect
        """
        flash(f"{error.status_code}: {json.dumps(dict(error.get_body()))}, {error.get_headers()}", "danger")
        return redirect("/", 307)

    def acquire_token(self, scopes=None):
        """A method to acquire current valid token with the given scope.
        Override method to add Authorization header from session.

        :param scopes: a list of scope values
        :return: token object
        """
        user = session.get("user")
        if not user:
            raise MissingAuthorizationError(
                self._default_auth_type, self._default_realm
            )
        token = user.get("id_token")
        if not token:
            raise MissingAuthorizationError(
                self._default_auth_type, self._default_realm
            )
        auth = {"Authorization": f"Bearer {token}"}

        request = HttpRequest(
            _req.method, _req.full_path, _req.data, {**_req.headers, **auth}
        )
        request.req = _req
        # backward compatible
        if isinstance(scopes, str):
            scopes = [scopes]
        token = self.validate_request(scopes, request)
        signals.token_authenticated.send(self, token=token)
        ctx = _app_ctx_stack.top
        ctx.authlib_server_oauth2_token = token
        return token

    def __call__(self, scopes=None, optional=False):
        def wrapper(f):
            @functools.wraps(f)
            def decorated(*args, **kwargs):
                try:
                    self.acquire_token(scopes)
                except MissingAuthorizationError as error:
                    if optional:
                        return f(*args, **kwargs)
                    return self.redirect_to_home(error)
                    # self.raise_error_response(error)
                except OAuth2Error as error:
                    return self.redirect_to_home(error)
                    # self.raise_error_response(error)
                return f(*args, **kwargs)
            return decorated
        return wrapper


require_auth = ResourceProtectorSession()
require_auth.register_token_validator(validator)
