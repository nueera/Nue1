"""
Application Configuration
─────────────────────────
All settings are loaded from environment variables.
Copy .env.example → .env and fill in your values.
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
    ]

    # ─── Database ───────────────────────────────────────────
    DATABASE_URL: str = "postgresql+asyncpg://nuegrowth:nuegrowth@localhost:5432/nuegrowth"
    DB_USER: str = "nuegrowth"
    DB_PASSWORD: str = "nuegrowth"
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "nuegrowth"

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
