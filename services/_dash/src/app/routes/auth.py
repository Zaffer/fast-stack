from urllib.parse import quote_plus, urlencode

from flask import Blueprint, redirect, render_template, session, url_for

from app.core.config_mfa import get_settings
from app.core.security import oauth

settings = get_settings(env="mfa.env")

bp = Blueprint("auth", __name__)


@bp.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("auth.callback", _external=True)
    )


@bp.route("/callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    session["user"] = token
    return redirect("/")


@bp.route("/logout")
def logout():
    session.clear()
    return redirect(
        "https://"
        + settings.AUTH0_DOMAIN
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": url_for("general.home", _external=True),
                "client_id": settings.AUTH0_CLIENT_ID,
            },
            quote_via=quote_plus,
        )
    )
