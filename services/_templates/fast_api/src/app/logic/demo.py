from typing import Any, Dict, Optional, Type, TypeVar, Union

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase

from sqlalchemy.orm import Session, declarative_base
from sqlalchemy.sql import select


Base = declarative_base()
ModelType = TypeVar("ModelType", bound=Base)


class JamesORM:
    """test a class for doing actions on models connected to the db
    * `test me`
    """

    def show_food(self, db: Session, *, fruit: str = None):
        if fruit == "banana":
            return "banana is yum"
        else:
            return None


james = JamesORM()
