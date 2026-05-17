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
    description="""
## NueOne — All-in-one Business Management Platform

### Modules
- **Auth** — User registration, login (JWT), profile management
- **CRM** — Contacts, Accounts, Leads, Deals pipeline
- **ERP** — Products, Inventory, Warehouses, Purchase/Sales Orders
- **Finance** — Chart of Accounts, Invoices, Expenses, Payments, Journal Entries, Reports
- **Marketing** — Campaigns, Email Templates, Social Posts, Content Pages, Analytics

### Authentication
1. Register via `POST /api/v1/auth/register`
2. Login via `POST /api/v1/auth/login` → get JWT token
3. Click **Authorize** button below → enter `Bearer <your-token>`
4. All protected endpoints will use the token automatically
    """,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
    swagger_ui_parameters={
        "persistAuthorization": True,
        "displayRequestDuration": True,
        "filter": True,
        "tryItOutEnabled": True,
    },
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
    """Run on app start — initialize DB tables, warm-up, etc."""
    print(f"🚀 {settings.APP_NAME} API v{settings.APP_VERSION} starting...")
    print(f"   Environment: {settings.APP_ENV}")
    print(f"   Docs: http://localhost:{settings.BACKEND_PORT}/api/docs")

    # Auto-create tables in development mode
    if settings.APP_ENV == "development":
        try:
            from app.core.database import async_engine, Base
            from app.models import *  # noqa: ensure all models are imported
            async with async_engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
            print("   ✅ Database tables synced (development mode)")
        except Exception as e:
            print(f"   ⚠️  DB table creation skipped: {e}")


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
