"""Entrypoint module to start application"""

from flask import Flask
from flask_bootstrap import Bootstrap5
from flask_cors import CORS
from flask_talisman import Talisman
from loguru import logger
from werkzeug.middleware.proxy_fix import ProxyFix
from authlib.integrations.flask_client import OAuth

from app.core.config_mfa import get_settings

settings = get_settings(env="mfa.env")
oauth = OAuth()


def create_app() -> Flask:
    server = Flask(
        __name__,
        # static_folder="web/static",
        # static_url_path="/static",
    )
    server.config.from_mapping(**settings.dict())

    register_extensions(server)
    register_blueprints(server)
    register_dashboards(server)

    return server


def register_extensions(server):
    # # PROXY FIX
    # This section is needed on localhost to generate http scheme and when deployed behind reversed proxy.
    # See https://flask.palletsprojects.com/en/1.0.x/deploying/wsgi-standalone/#proxy-setups
    server.wsgi_app = ProxyFix(server.wsgi_app, x_proto=1, x_host=1)

    # # CORS SETUP
    resources = {r"/mfa/*": {"origins": ["http://localhost:4200"]}}
    CORS(server, resources=resources)
    server.config["CORS_HEADERS"] = "Content-Type"

    # SECURITY SETUP
    csp = {
        "default-src": [
            "'unsafe-eval'",
            "'self'",
            "'unsafe-inline'",
            "cdn.jsdelivr.net",
            "cdnjs.cloudflare.com",
            "use.fontawesome.com",
            "kit.fontawesome.com",
            "ka-f.fontawesome.com",
            "cdn.plot.ly",
        ],
        "img-src": [
            "'self'",
            "data:",
            "blob:",
            "storage.googleapis.com",
            "s.gravatar.com",
            "i0.wp.com",
        ],
        # "worker-src": ["'self'", "blob:"],
        "font-src": [
            "'self'",
            "data:",
            "fonts.gstatic.com",
            "use.fontawesome.com",
        ],
        "frame-ancestors": [
            "'self'",
            "localhost:4200",
            "dashboard.app.com",
        ],
    }

    # # TALISMAN SETUP
    Talisman(server, force_https=False, content_security_policy=csp)

    # # SESSION SETUP
    # Session(app)

    # # ADD BOOTSTRAP
    Bootstrap5(server)

    # # AUTHENTICATION SETUP
    oauth.init_app(server)


def register_blueprints(server):

    with server.app_context():

        # from app.web.routes.csv import csv
        # app.register_blueprint(csv)

        from app import routes

        # server.register_blueprint(routes.dashboard)
        server.register_blueprint(routes.mfa)
        server.register_blueprint(routes.auth_bp)
        server.register_blueprint(routes.general_bp)

        return server


def register_dashboards(server):

    with server.app_context():

        from app import dashboards

        # MFA DASHBOARDS
        server = dashboards.dash1.init_dash(server)
        server = dashboards.dash2.init_dash(server)

        return server


app = create_app()


if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)
