"""
Health Check Endpoint
─────────────────────
Used by Docker, Nginx, and monitoring tools to verify the API is running.
"""

from fastapi import APIRouter
from app.core.config import settings

router = APIRouter()


@router.get("/health")
async def health_check():
    """Basic liveness check."""
    return {
        "status": "ok",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "env": settings.APP_ENV,
    }


@router.get("/health/detailed")
async def health_detailed():
    """Detailed health check — includes DB and Redis status."""
    checks = {"api": "ok"}

    # Check Database
    try:
        from app.core.database import engine
        async with engine.connect() as conn:
            await conn.execute(__import__("sqlalchemy").text("SELECT 1"))
        checks["database"] = "ok"
    except Exception as e:
        checks["database"] = f"error: {str(e)}"

    # Check Redis
    try:
        import redis.asyncio as aioredis
        r = aioredis.from_url(settings.REDIS_URL)
        await r.ping()
        checks["redis"] = "ok"
        await r.close()
    except Exception as e:
        checks["redis"] = f"error: {str(e)}"

    overall = "ok" if all(v == "ok" for v in checks.values()) else "degraded"
    return {"status": overall, "checks": checks}
