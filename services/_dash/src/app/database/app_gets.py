from operator import index
import pandas as pd
from loguru import logger
from psycopg2 import sql
from datetime import datetime
from dateutil.relativedelta import relativedelta
from app.database.con import PgCons, exc_qrs_get_dfs_txt
import calendar
import numpy as np



# QUICKDESK GETS
def get_workspace_data():
    query = sql.SQL(
        """
        COPY (
            SELECT * FROM users LIMIT 10
        ) TO STDOUT WITH CSV HEADER
        """
    )

    query_list = [query]

    try:
        response_list = exc_qrs_get_dfs_txt(query_list, db=PgCons.QRS)
        response = response_list[0]
    except Exception as error:
        logger.info(error)
        return error
    logger.info(f"DF::: {type(response)}")
    return [response]

# QUICKBUTTON GETS


# QUICKCHECKIN GETS

