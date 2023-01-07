"""Instantiate a Dash app."""
from dash import dcc, html, dash_table
import dash_bootstrap_components as dbc


interval = dcc.Interval(
    id="interval-component",
    interval=300 * 1000,
    n_intervals=0,
)

header = dbc.Card(
    dbc.CardHeader("Request"),
    style={
        "width": "100%",
        "display": "flex",
        # "flex-direction": "row",
        "flex-wrap": "wrap",
        "justify-content": "center",
        "padding": "0.5%",
        "margin": "0.5%",
    },
)

cards = dbc.Card(
    children=[
        dcc.Loading(
            dbc.Card(
                children=[
                    dbc.CardHeader("Delivery"),
                    dbc.CardBody(
                        id="card-1",
                        style={"background-color": "#28a745"},
                    ),
                ],
                style={"width": "25vw"},
            )
        ),
        dcc.Loading(
            dbc.Card(
                children=[
                    dbc.CardHeader("time"),
                    dbc.CardBody(
                        id="card-2",
                        style={"background-color": "#ffc107"},
                    ),
                ],
                style={"width": "25vw"},
            )
        ),
        dcc.Loading(
            dbc.Card(
                children=[
                    dbc.CardHeader("Date Time"),
                    dbc.CardBody(
                        id="card-3",
                        style={"background-color": "#dc3545"},
                    ),
                ],
                style={"width": "25vw"},
            )
        ),
    ],
    id="summary-cards",
    style={
        "width": "100%",
        "display": "flex",
        "flex-direction": "row",
        # "flex-wrap": "wrap",
        "justify-content": "space-around",
        "padding": "0.5%",
        "margin": "0.5%",
    },
)
plots = dbc.Card(
    children=[
        dbc.CardHeader("Deliveries Day"),
        dbc.CardBody(dcc.Loading(dcc.Graph(id="time-graph"))),
    ],
    id="plots",
    style={
        "width": "100%",
        "display": "flex",
        "flex-direction": "column",
        # "flex-wrap": "wrap",
        "justify-content": "space-around",
        "padding": "0.5%",
        "margin": "0.5%",
    },
)
table = dbc.Card(
    children=[
        dbc.CardHeader("Times Datable", style={"width": "100%"}),
        dbc.CardBody(
            children=[
                dcc.Loading(
                    dash_table.DataTable(
                        id="status-logs",
                        sort_action="native",
                        sort_mode="native",
                        page_current=0,
                        style_cell={"textAlign": "left", "font-size": "small"},
                        style_data_conditional=[
                            {
                                "if": {"row_index": "odd"},
                                "backgroundColor": "rgb(220, 220, 220)",
                            }
                        ],
                    )
                ),
            ]
        ),
    ],
    id="tables",
    style={
        "width": "100%",
        "height": "100vh",
        "overflow": "auto",
        # "display": "flex",
        # # "flex-direction": "column",
        # "flex-wrap": "wrap",
        # "justify-content": "space-around",
        "padding": "0.5%",
        "margin": "0.5%",
    },
)
layout = html.Div(
    children=[interval, header, cards, plots, table],
    id="main-div",
    style={
        "width": "98%",
        "background-color": "",
        "display": "flex",
        "flex-direction": "column",
        "justify-content": "space-around",
        "padding": "0.5%",
        "margin": "0.5%",
        "flex-wrap": "wrap",
    },
)
