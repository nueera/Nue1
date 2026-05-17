"""
Database Configuration
──────────────────────
Async SQLAlchemy engine + session factory.
Uses the effective_database_url from settings for Docker compatibility.
"""

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    create_async_engine,
    async_sessionmaker,
)
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings

# ── Async Engine ──────────────────────────────────────────────
# Uses effective_database_url which handles Docker vs localhost
engine = create_async_engine(
    settings.effective_database_url,
    echo=settings.APP_DEBUG,
    future=True,
    pool_size=10,
    max_overflow=20,
)

# ── Session Factory ───────────────────────────────────────────
async_session = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

# Keep alias for backward compatibility
async_engine = engine


# ── Base Class ────────────────────────────────────────────────
class Base(DeclarativeBase):
    """Declarative base for all ORM models."""
    pass


# ── Dependency ────────────────────────────────────────────────
async def get_db():
    """
    FastAPI dependency that yields an async DB session.
    Auto-commits on success, rolls back on error.
    """
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
