"""This is where all the SQL Alchemy database models are setup.
"""
# Import all the models, so that Base has them before being imported by Alembic
# make sure all SQLModel models are imported (app.models) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly


from app.models.user import User, UserCreate, UserRead, UserUpdate

# ItemReadWithUser.update_forward_refs(
#     UserRead=UserRead, ItemReadOptional=CheckinShiftReadOptional

# ItemReadWithUser.update_forward_refs(UserRead=UserRead)
