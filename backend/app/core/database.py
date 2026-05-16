"""
Database Setup
──────────────
Async SQLAlchemy engine + session factory.
All models use the same Base class for Alembic migrations.
"""

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from typing import AsyncGenerator

from app.core.config import settings

# ── Async Engine ────────────────────────────────────────────
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.APP_DEBUG,
    future=True,
    pool_size=10,
    max_overflow=20,
)

# ── Session Factory ─────────────────────────────────────────
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


# ── Declarative Base (for models) ───────────────────────────
class Base(DeclarativeBase):
    """All ORM models should inherit from this class."""
    pass


# ── Dependency: get DB session ──────────────────────────────
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    FastAPI dependency that yields an async DB session.
    Automatically closes the session after the request.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
