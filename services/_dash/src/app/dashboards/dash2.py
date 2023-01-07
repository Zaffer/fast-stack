"""Instantiate a Dash app."""
from copy import deepcopy
from datetime import date, timedelta

import dash_bootstrap_components as dbc
import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from app.dashboards.layouts.layout_components import layout
from services._dash.src.app.database.app_gets import get_workspace_data
from dash import Dash, Input, Output, callback_context, dash_table, dcc, html
from flask import Flask
from loguru import logger

APP_ID = "dash2"
URL_BASE = f"/dash/{APP_ID}/"
MIN_HEIGHT = 200
today = date.today()
yesterday = today - timedelta(days=1)


def init_dash(server: Flask | None = None):
    dash_app = Dash(
        __name__,
        server=server or True,
        # url_base_pathname=URL_BASE,
        routes_pathname_prefix=URL_BASE,
        suppress_callback_exceptions=True,
        external_stylesheets=[dbc.themes.BOOTSTRAP],
    )

    dash_app.layout = layout

    return init_callbacks(dash_app)


def init_callbacks(dash_app):
    @dash_app.callback(
        Output("card-1", "children"),
        Output("card-2", "children"),
        Output("card-3", "children"),
        [
            Input("interval-component", "n_intervals"),
        ],
    )
    def populate_cards(n_intervals) -> tuple:
        data = get_workspace_data()

        logger.info(f"MADE IT HERE:::{data}")


if __name__ == "__main__":
    """debug mode"""  # TODO work in progres

    # logger.info("running the module direct")
    # app = init_dash()
    # app.run_server(debug=True)

    from flask import Flask, render_template
    from flask_bootstrap import Bootstrap5

    bootstrap = Bootstrap5()
    app = Flask(__name__)
    bootstrap.init_app(app)

    # inject Dash
    # app = init_dash(app, login_reg=False)
    app = init_dash(app)

    @app.route("/debug")
    def dash_app():
        return render_template(
            "dash_app_debug.html", dash_url=URL_BASE, min_height=MIN_HEIGHT
        )

    app_port = 5001
    print(f"http://localhost:{app_port}{URL_BASE}/debug")
    app.run(debug=True, port=app_port)
