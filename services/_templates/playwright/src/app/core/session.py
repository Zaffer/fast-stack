import contextlib

import redis.asyncio as redis
from loguru import logger


async def get_con():
    connection = redis.Redis(host="redis", port=6379, db=0, decode_responses=True)
    try:
        await connection.ping()
        yield connection
    except redis.AuthenticationError:
        logger.info("Redis authentication error")
        raise redis.AuthenticationError
    except redis.ConnectionError:
        logger.info("Redis connection error")
        raise redis.ConnectionError
    finally:
        logger.info("Redis connection stopped")
        await connection.close()


async def get_session():
    RedisSession = contextlib.asynccontextmanager(get_con)
    async with RedisSession() as session:
        return await session



from app.core.config import secrets, settings
from sqlalchemy.orm import sessionmaker
from sqlmodel import Session, create_engine

# # an Engine, which the Session will use for connection resources, typically in module scope
# engine = create_engine(postgres_url, pool_pre_ping=True, echo=True)
engine = create_engine(secrets.POSTGRES_URL, pool_pre_ping=True)

# # a sessionmaker(), also in the same scope as the engine
SessionLocal = sessionmaker(bind=engine, class_=Session)
# SessionLocal = sessionmaker(bind=engine, future=True)
