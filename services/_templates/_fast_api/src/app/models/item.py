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

if TYPE_CHECKING:
    from .user import User, UserRead


class ItemBase(SQLModel):
    __tablename__ = "item" # type: ignore
    owner_id: int | None = Field(default=None, foreign_key="user.id")
    name: str = Field(sa_column_kwargs={"unique": True})
    description: str | None = None


class Item(ItemBase, table=True):
    id: int | None = Field(
        default=None,
        sa_column_args=(Identity(always=True),),
        primary_key=True,
        nullable=False,
    )
    owner: "User" | None = Relationship(back_populates="items")


class ItemCreate(ItemBase):
    pass


class ItemRead(ItemBase):
    id: int


class ItemUpdate(SQLModel):
    name: str | None = None
    description: str | None = None


class ItemReadWithOwner(ItemRead):
    owner: "UserRead" | None = None