"""
Celery Worker
─────────────
Background task processing for the NueOne platform.
Run: celery -A app.worker worker --loglevel=info
"""

from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "nueone-worker",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_acks_late=True,
    worker_prefetch_multiplier=1,
)

# Auto-discover tasks from app.services
celery_app.autodiscover_tasks(["app.services"])


# ── Sample Task ─────────────────────────────────────────────
@celery_app.task(bind=True)
def debug_task(self):
    """Simple test task to verify Celery is working."""
    print(f"Request: {self.request!r}")
    return {"status": "ok", "task_id": self.request.id}
