"""CRUD base class with basic create, retrieve, update, and delete functions
"""
import secrets

# TODO consider using psql v13 uuid function instead:
# https://www.postgresql.org/docs/13/functions-uuid.html
from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

# from sqlalchemy import select, delete
from sqlalchemy.orm import Session, declarative_base
from sqlmodel import select, delete
from sqlmodel.main import default_registry

from app.models import User

# Base = default_registry.generate_base()
Base = declarative_base()

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
ReadSchemaType = TypeVar("ReadSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class BaseCrud(Generic[ModelType, CreateSchemaType, ReadSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        """Default crud base to make new crud classes from

        includes:
        Create, Read, Update, Delete.

        **Parameters**
        * `model`: the SQLModel model class of the table
        """
        self.model = model

    def create(self, db: Session, *, obj_in: CreateSchemaType) -> ModelType:
        db_obj = self.model(**obj_in.dict())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get(self, db: Session, id: int) -> Optional[ModelType]:
        return db.exec(select(self.model).where(self.model.id == id)).one()
        # return db.execute(select(self.model).where(self.model.id == id)).first()
        # return db.execute(select(self.model).where(self.model.id == id)).fetchone()

    def get_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        return db.exec(select(self.model).offset(skip).limit(limit)).all()

    def update(
        self, db: Session, *, obj_id: int, obj_in: UpdateSchemaType
    ) -> ModelType:
        db_obj = db.get(self.model, obj_id)
        if not db_obj:
            return None
        obj_data = obj_in.dict(exclude_unset=True)
        for key, value in obj_data.items():
            setattr(db_obj, key, value)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, obj_id: int) -> ModelType:
        db_obj = db.get(self.model, obj_id)
        if not db_obj:
            return None
        db.delete(db_obj)
        db.commit()
        return True

    # def create(self, db: Session, *, obj_in: CreateSchemaType) -> ModelType:
    #     obj_in_data = jsonable_encoder(obj_in)
    #     db_obj = self.model(**obj_in_data)
    #     if "slug" in self.model.__table__.columns:
    #         db_obj.slug = f"{self.model.slug_prefix}{secrets.token_hex(8)}"
    #     db.add(db_obj)
    #     return db_obj
