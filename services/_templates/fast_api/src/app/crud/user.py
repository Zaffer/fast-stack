from typing import Any, Dict, Optional, Union, List

from sqlmodel import Session, select

from app.crud.base import BaseCrud
from app.models import User, UserCreate, UserRead, UserUpdate
from app.core.auth0 import Auth0, Auth0User

from loguru import logger


class UserCrud(BaseCrud[User, UserCreate, UserRead, UserUpdate]):
    def get_by_id(
        self, db: Session, current_user: User, user_id: int
    ) -> Optional[User]:

        stmnt = (
            select(User)
            .where(User.company_id == current_user.company_id)
            .where(User.id == user_id)
        )
        user = db.exec(stmnt)

        return user.one_or_none()


    def get_by_email(
        self, db: Session, auth0_user: Auth0User, email: str
    ) -> Optional[User]:

        stmnt = (
            select(User)
            .filter(User.email == auth0_user.email)
            .where(User.email == email)
        )

        if "read:users" in auth0_user.permissions:
            stmnt = (
                select(User)
                .where(
                    User.company_id
                    == (select(User.company_id).where(User.email == auth0_user.email))
                )
                .where(User.email == email)
            )

        if "read:all" in auth0_user.permissions:
            stmnt = select(User).where(User.email == email)

        user = db.exec(stmnt)

        return user.first()



user = UserCrud(User)
