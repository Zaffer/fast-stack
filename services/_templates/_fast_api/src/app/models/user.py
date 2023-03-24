from datetime import datetime, date
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import (
    Column,
    Date,
    DateTime,
    Field,
    Identity,
    Relationship,
    SQLModel,
    func,
)

# if TYPE_CHECKING:
#     from .item import Item


class UserBase(SQLModel):
    __tablename__ = "user"
    name: str | None = None
    email: str = Field(sa_column_kwargs={"unique": True})


class User(UserBase, table=True):
    id: int | None = Field(
        default=None,
        sa_column_args=(Identity(always=True),),
        primary_key=True,
        nullable=False,
    )
    # items: Optional[List["Item"]] = Relationship(back_populates="user")


class UserCreate(UserBase):
    pass


class UserRead(UserBase):
    id: int


class UserBasicRead(SQLModel):
    id: int
    name: str | None
    email: str | None


class UserUpdate(SQLModel):
    name: str | None = None
    email: str | None = None
