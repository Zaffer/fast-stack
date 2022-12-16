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
