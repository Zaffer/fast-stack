from flask import render_template, Blueprint, session

from app.dashboards import (
    dash1,
    dash2,
)
from app.core.security import require_auth

dashboard = Blueprint(
    "dashboard",
    __name__,
    template_folder="../templates/",
    # static_folder="../static",
    # static_url_path="/static",
    # url_prefix="",
)


# http://localhost:4200/dash1
@dashboard.route(f"/{dash1.APP_ID}")
@require_auth()
def fuel_and_tolls():
    return render_template(
        "dash_app.html",
        session=session.get("user"),
        dash_url=dash1.URL_BASE + "?token=123abc",
        min_height=dash1.MIN_HEIGHT,
        logo="images/logo.png",
        brand="Dash Analytics",
    )


# http://localhost:4200/dash2
@dashboard.route(f"/{dash2.APP_ID}")
@require_auth()
def comp_cpk_per_asset():
    return render_template(
        "dash_app.html",
        session=session.get("user"),
        dash_url=dash2.URL_BASE + "?token=123abc",
        min_height=dash2.MIN_HEIGHT,
        logo="images/logo.png",
        brand="Dash Analytics",
    )

