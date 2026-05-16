"""
NueOne Backend — FastAPI Application
─────────────────────────────────────
Main entry point. All routers are registered here.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.v1.endpoints import health, auth, crm, erp, finance, marketing

# ── App Instance ────────────────────────────────────────────
app = FastAPI(
    title=f"{settings.APP_NAME} API",
    version=settings.APP_VERSION,
    description="NueOne — All-in-one Business Management Platform (ERP / CRM / Finance / Marketing)",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

# ── CORS Middleware ──────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Startup / Shutdown Events ───────────────────────────────
@app.on_event("startup")
async def startup_event():
    """Run on app start — can be used for warm-up, DB checks, etc."""
    print(f"🚀 {settings.APP_NAME} API v{settings.APP_VERSION} starting...")
    print(f"   Environment: {settings.APP_ENV}")
    print(f"   Docs: http://localhost:{settings.BACKEND_PORT}/api/docs")


@app.on_event("shutdown")
async def shutdown_event():
    """Run on app shutdown — clean up connections, etc."""
    print(f"👋 {settings.APP_NAME} API shutting down...")


# ── Root Endpoint ───────────────────────────────────────────
@app.get("/")
async def root():
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "docs": "/api/docs",
        "health": "/api/v1/health",
    }


# ── Register Routers ────────────────────────────────────────
app.include_router(health.router,    prefix="/api/v1", tags=["Health"])
app.include_router(auth.router,      prefix="/api/v1/auth", tags=["Auth"])
app.include_router(crm.router,       prefix="/api/v1/crm", tags=["CRM"])
app.include_router(erp.router,       prefix="/api/v1/erp", tags=["ERP"])
app.include_router(finance.router,   prefix="/api/v1/finance", tags=["Finance"])
app.include_router(marketing.router,  prefix="/api/v1/marketing", tags=["Marketing"])
