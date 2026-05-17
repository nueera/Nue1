"""
Application Configuration
─────────────────────────
All settings are loaded from environment variables.
Copy .env.example → .env and fill in your values.

When running inside Docker Compose, the DATABASE_URL is set automatically
with the correct hostname (e.g., "db" instead of "localhost").
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # ─── General ────────────────────────────────────────────
    APP_NAME: str = "nuegrowth"
    APP_ENV: str = "development"
    APP_DEBUG: bool = True
    APP_VERSION: str = "0.2.0"

    # ─── Backend ────────────────────────────────────────────
    BACKEND_PORT: int = 8000
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost",
        "http://localhost:80",
    ]

    # ─── Database ───────────────────────────────────────────
    # When running in Docker Compose, set DATABASE_URL to:
    #   postgresql+asyncpg://nuegrowth:nuegrowth@db:5432/nuegrowth
    DATABASE_URL: str = "postgresql+asyncpg://nuegrowth:nuegrowth@localhost:5432/nuegrowth"
    DB_USER: str = "nuegrowth"
    DB_PASSWORD: str = "nuegrowth"
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "nuegrowth"

    @property
    def effective_database_url(self) -> str:
        """
        Return the DATABASE_URL, preferring the explicitly set one
        (for Docker Compose) over the auto-assembled one.
        """
        if self.DATABASE_URL and "localhost" not in self.DATABASE_URL:
            return self.DATABASE_URL
        # Fallback: assemble from individual parts
        return (
            f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )

    # ─── Redis ──────────────────────────────────────────────
    REDIS_URL: str = "redis://localhost:6379/0"

    # ─── Auth / JWT ─────────────────────────────────────────
    JWT_SECRET: str = "change-me-to-a-secure-random-string"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_MINUTES: int = 60

    # ─── Celery ─────────────────────────────────────────────
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/2"

    # ─── AI / LLM ──────────────────────────────────────────
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


# Singleton instance — import this everywhere
settings = Settings()
