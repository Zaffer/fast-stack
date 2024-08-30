import json

from flask import Blueprint, render_template, session, jsonify, request

from app.core.security import require_auth


bp = Blueprint("general", __name__)


@bp.route("/")
def home():
    # return render_template(
    #     "index.html",
    #     session=session.get("user"),
    #     # pretty=json.dumps(session.get("user"), indent=4),
    #     logo="images/wesbank-logo.png",
    # )
    return "This view requires the correct url in the frame."


@bp.route("/ping")
def ping():
    return "pong"


@bp.route("/view/private")
@require_auth()
def private():
    """A valid access token is required."""

    response = "hi private"

    return response


@bp.route("/view/scoped")
@require_auth("profile")
def private_scoped():
    """A valid access token and scope are required."""
    response = (
        "Hello from a private endpoint! You need to be"
        " authenticated and have a scope of read:messages to see"
        " this."
    )
    return jsonify(message=response)


@bp.route("/api/private")
@require_auth()
def private_header():
    """A valid access token and scope are required."""
    response = (
        "Hello from a private endpoint! You need to be"
        " authenticated and have a scope of read:messages to see"
        " this."
    )
    return jsonify(message=response)
