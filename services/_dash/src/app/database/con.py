"""This module does the query execution to the database"""

import io
from enum import Enum
from typing import List

import pandas as pd
import psycopg2 as pg
from loguru import logger
from pandas import DataFrame
from pydantic import BaseModel

from app.core.config import settings as settings_app
from app.core.config import settings2 as settings_app2


class PgConKwargs(BaseModel):
    user: str
    password: str
    dbname: str
    host: str
    port: str


class PgCons(Enum):
    MFA: PgConKwargs = PgConKwargs(
        user=settings_app.POSTGRES_USER,
        password=settings_app.POSTGRES_PASSWORD,
        dbname=settings_app.POSTGRES_DBNAME,
        host=settings_app.POSTGRES_HOST,
        port=settings_app.POSTGRES_PORT,
    )
    QRS: PgConKwargs = PgConKwargs(
        user=settings_app2.POSTGRES_USER,
        password=settings_app2.POSTGRES_PASSWORD,
        dbname=settings_app2.POSTGRES_DBNAME,
        host=settings_app2.POSTGRES_HOST,
        port=settings_app2.POSTGRES_PORT,
    )


def execute_queries_only(query_string_list, *, db: PgCons) -> None:
    """Excute the list of queries as sql and dont return"""

    con = None
    response = None

    try:
        con = pg.connect(**db.value.dict())
        cur = con.cursor()
        for query in query_string_list:
            cur.execute(query)
        con.commit()
        cur.close()

    except pg.Error as error:
        response = error
    finally:
        if con is not None:
            con.close()

    return response


def exc_qrs_get_dfs_txt(query_list: List[str], *, db: PgCons) -> List[DataFrame]:
    """Excute the list of queries as sql and returns dataframes all as type text

    :param str query_list: list of sql strings
    :param enum db: which db to use eg: `db="APP")` or `db="APP2")`
    """

    con = None
    response = []
    try:
        con = pg.connect(**db.value.dict())
        cur = con.cursor()
        for query in query_list:
            store = io.StringIO()
            cur.copy_expert(query, store)
            store.seek(0)
            df = pd.read_csv(store, na_filter=False, dtype=str)
            response.append(df)
        con.commit()
        cur.close()

    except pg.Error as error:
        [(error) for query in query_list]
    except Exception as error:
        [(error) for query in query_list]
    finally:
        if con:
            con.close()

    return response


def exc_qrs_get_dfs_raw(query_list: List[str], *, db: PgCons) -> List[DataFrame]:
    """Excute the list of queries as sql and returns dataframes all in their native types

    :param str query_list: list of sql strings
    :param enum db: which db to use eg: `db="APP")` or `db="APP2")`
    """

    con = None
    response = []
    try:
        con = pg.connect(**db.value.dict())
        cur = con.cursor()
        for query in query_list:
            store = io.StringIO()
            cur.copy_expert(query, store)
            store.seek(0)
            df = pd.read_csv(store, na_filter=False)
            response.append(df)
        con.commit()
        cur.close()

    except pg.Error as error:
        [(error) for query in query_list]
    except Exception as error:
        [(error) for query in query_list]
    finally:
        if con:
            con.close()

    return response
