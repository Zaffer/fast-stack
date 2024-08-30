from email.errors import MisplacedEnvelopeHeaderDefect
from operator import index
from urllib import response
from webbrowser import UnixBrowser
import pandas as pd
from loguru import logger
from psycopg2 import sql
from datetime import datetime, date
from dateutil.relativedelta import relativedelta
from app.database.con import PgCons, exc_qrs_get_dfs_txt, exc_qrs_get_dfs_raw
from typing import List, OrderedDict
import swifter, calendar
import numpy as np
from dateutil import relativedelta
from app.dashboards.dash_helper_functions import comma
from dateutil.rrule import *


def get_user_role(email: str):
    logger.info(f"get_user_role(email = {email})")

    select_statement = sql.SQL(
        """
        COPY (
            SELECT user_role.user_role_name FROM users
            INNER JOIN user_role ON user_role.id = users.user_role_id
            WHERE users.email = {email}
        ) TO STDOUT WITH CSV HEADER
        """
    ).format(
        email=sql.Literal(email),
    )

    query_list = [select_statement]

    try:
        response = exc_qrs_get_dfs_txt(query_list)

        if isinstance(response, Exception):
            raise CustomError(ERR_MSG["DATABASE_CONN"])

        user_role = response[0].to_dict(orient='records')
        return user_role

    except Exception as error:
        logger.info(error)
        return error


def get_assets_for_asset_view_dropdown(start_date: datetime, end_date: datetime):
    """Get list of assets for per-asset-view dropdown: Branch -> Type -> Model -> Asset"""
    query_list = []
    get_query = sql.SQL(
        """COPY (
            select branch, pieicleid, pie_model_map, make, pie_type_map, map, deal_number
            from pie.pielist
        ) TO STDOUT WITH CSV HEADER"""
    ).format(
        start_date=sql.Literal(start_date),
        end_date=sql.Literal(end_date),
    )

    query_list.append(get_query)

    try:
        response_list = exc_qrs_get_dfs_raw(query_list, db=PgCons.MFA)
        assets_menu = response_list[0].replace("", 0).fillna(0)

    except Exception as error:
        logger.exception(error)
        return error
    # logger.info(repairs_df)

    return assets_menu
