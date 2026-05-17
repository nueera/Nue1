# 🧪 NueOne API — Testing Guide with Swagger UI

Complete guide for testing all NueOne API endpoints using **Swagger UI** (interactive API docs).

---

## 🚀 Quick Start

### 1. Start the Backend

**Option A: Docker Compose (Recommended)**
```bash
# Start all services (PostgreSQL, Redis, Backend, Frontend, Nginx)
docker compose up --build -d

# Run database migrations
docker compose exec backend alembic upgrade head

# Seed sample data
docker compose exec backend python -m scripts.seed
```

**Option B: Local Development (without Docker)**
```bash
# Terminal 1: Start PostgreSQL & Redis (or use Docker just for these)
docker run -d --name postgres -p 5432:5432 -e POSTGRES_USER=nuegrowth -e POSTGRES_PASSWORD=nuegrowth -e POSTGRES_DB=nuegrowth postgres:16-alpine
docker run -d --name redis -p 6379:6379 redis:7-alpine

# Terminal 2: Start FastAPI backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 2. Open Swagger UI

Navigate to: **http://localhost:8000/api/docs**

This gives you an interactive API playground where you can:
- Browse all endpoints grouped by module (Auth, CRM, ERP, Finance, Marketing)
- Try out each endpoint with sample data
- See request/response schemas
- Authenticate with JWT

---

## 🔐 Authentication Flow

### Step 1: Register a User

```
POST /api/v1/auth/register
```

**Request Body:**
```json
{
  "email": "test@nueone.io",
  "password": "test123456",
  "full_name": "Test User"
}
```

**Response (201):**
```json
{
  "id": 1,
  "email": "test@nueone.io",
  "full_name": "Test User",
  "is_active": true,
  "role": "user",
  "created_at": "2025-01-15T10:00:00",
  "updated_at": "2025-01-15T10:00:00"
}
```

### Step 2: Login & Get JWT Token

```
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "email": "test@nueone.io",
  "password": "test123456"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Step 3: Authorize in Swagger UI

1. Click the **🔒 Authorize** button at the top of the Swagger UI page
2. In the popup, enter: `Bearer <your-access-token>`
   - Example: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
3. Click **Authorize**
4. Now all subsequent "Try it out" requests will include the JWT token automatically

### Step 4: Verify Authentication

```
GET /api/v1/auth/me
```

Should return your user profile if the token is valid.

---

## 📊 CRM Module Testing

### Contacts

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/crm/contacts` | GET | List all contacts (paginated) |
| `/api/v1/crm/contacts` | POST | Create a new contact |
| `/api/v1/crm/contacts/{id}` | GET | Get contact by ID |
| `/api/v1/crm/contacts/{id}` | PUT | Update contact |
| `/api/v1/crm/contacts/{id}` | DELETE | Delete contact |

**Create Contact:**
```json
{
  "first_name": "Rahul",
  "last_name": "Sharma",
  "email": "rahul@example.com",
  "phone": "+91-9876543210",
  "company": "TechCorp India",
  "designation": "CTO",
  "source": "website",
  "status": "active"
}
```

**List Contacts with Filters:**
- `?page=1&page_size=20` — Pagination
- `?search=rahul` — Search by name/email
- `?status=active` — Filter by status

### Accounts

**Create Account:**
```json
{
  "name": "TechCorp India Pvt Ltd",
  "industry": "Technology",
  "website": "https://techcorp.in",
  "phone": "+91-11-23456789",
  "annual_revenue": 5000000,
  "employees": 250,
  "type": "customer",
  "billing_address": "Connaught Place, New Delhi",
  "shipping_address": "Connaught Place, New Delhi"
}
```

### Leads

**Create Lead:**
```json
{
  "first_name": "Priya",
  "last_name": "Patel",
  "email": "priya@startup.io",
  "phone": "+91-9988776655",
  "company": "StartupIO",
  "source": "linkedin",
  "status": "new",
  "estimated_value": 250000
}
```

### Deals

**Create Deal:**
```json
{
  "title": "Enterprise License Deal",
  "value": 1500000,
  "stage": "proposal",
  "probability": 60,
  "expected_close_date": "2025-06-30",
  "contact_id": 1,
  "account_id": 1
}
```

---

## 🏭 ERP Module Testing

### Dashboard
```
GET /api/v1/erp/dashboard
```
Returns summary metrics: total products, low stock alerts, pending orders, etc.

### Products

**Create Product:**
```json
{
  "name": "Wireless Mouse Pro",
  "sku": "WM-PRO-001",
  "barcode": "8901234567890",
  "description": "Ergonomic wireless mouse with USB-C",
  "category_id": 1,
  "product_type": "physical",
  "cost_price": 450.00,
  "selling_price": 899.00,
  "mrp": 999.00,
  "tax_rate_id": 1,
  "unit": "piece",
  "weight": 0.12,
  "min_stock_level": 50,
  "is_active": true
}
```

### Inventory

**Create Inventory Entry:**
```json
{
  "product_id": 1,
  "warehouse_id": 1,
  "qty_on_hand": 200,
  "qty_reserved": 10,
  "bin_location": "A3-S2",
  "batch_number": "BATCH-2025-001"
}
```

**Low Stock Alerts:**
```
GET /api/v1/erp/inventory/low-stock
```

### Purchase Orders

**Create Purchase Order:**
```json
{
  "supplier_id": 1,
  "warehouse_id": 1,
  "expected_delivery_date": "2025-02-15",
  "notes": "Urgent restock order",
  "items": [
    {
      "product_id": 1,
      "quantity": 500,
      "unit_price": 450.00
    },
    {
      "product_id": 2,
      "quantity": 200,
      "unit_price": 1200.00
    }
  ]
}
```

### Sales Orders

**Create Sales Order:**
```json
{
  "customer_id": 1,
  "shipping_address": "123 Business Park, Mumbai",
  "notes": "Priority delivery requested",
  "items": [
    {
      "product_id": 1,
      "quantity": 10,
      "unit_price": 899.00
    }
  ]
}
```

---

## 💰 Finance Module Testing

### Dashboard
```
GET /api/v1/finance/dashboard
```
Returns financial summary: total revenue, expenses, outstanding, etc.

### Chart of Accounts

**Create Account:**
```json
{
  "code": "1000",
  "name": "Cash in Bank",
  "account_type": "asset",
  "sub_type": "current_asset",
  "description": "Primary business bank account",
  "parent_id": null,
  "is_active": true
}
```

### Invoices

**Create Invoice:**
```json
{
  "invoice_number": "INV-2025-001",
  "invoice_type": "sales",
  "customer_id": 1,
  "issue_date": "2025-01-15",
  "due_date": "2025-02-15",
  "items": [
    {
      "description": "Enterprise License - Annual",
      "quantity": 1,
      "unit_price": 1500000.00,
      "tax_rate_id": 1
    }
  ]
}
```

### Expenses

**Create Expense:**
```json
{
  "title": "Office Rent - January",
  "amount": 75000.00,
  "category": "rent",
  "expense_date": "2025-01-01",
  "vendor": "City Properties Ltd",
  "payment_method": "bank_transfer",
  "status": "pending"
}
```

### Payments

**Create Payment:**
```json
{
  "payment_type": "received",
  "amount": 1500000.00,
  "payment_method": "bank_transfer",
  "reference_number": "TXN-2025-001",
  "invoice_id": 1,
  "account_id": 1,
  "payment_date": "2025-01-20"
}
```

### Journal Entries (Double-Entry Bookkeeping)

**Create Journal Entry:**
```json
{
  "entry_number": "JE-2025-001",
  "description": "Recording sales revenue",
  "entry_date": "2025-01-15",
  "is_posted": false,
  "lines": [
    {
      "account_id": 1,
      "debit": 1500000.00,
      "credit": 0,
      "description": "Cash received"
    },
    {
      "account_id": 2,
      "debit": 0,
      "credit": 1500000.00,
      "description": "Sales revenue"
    }
  ]
}
```

> **Note:** Total debits MUST equal total credits. The API validates this.

### Reports

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/finance/reports/profit-loss?start_date=2025-01-01&end_date=2025-03-31` | Profit & Loss Statement |
| `GET /api/v1/finance/reports/cash-flow?start_date=2025-01-01&end_date=2025-03-31` | Cash Flow Report |
| `GET /api/v1/finance/reports/outstanding?as_of_date=2025-01-31` | Outstanding Invoices/Payments |

---

## 📱 Marketing Module Testing

### Dashboard
```
GET /api/v1/marketing/dashboard
```
Returns campaign metrics with calculated CTR, ROI, CPL.

### Campaigns

**Create Campaign:**
```json
{
  "name": "Diwali Sale 2025",
  "campaign_type": "email",
  "channel_id": 1,
  "status": "draft",
  "budget": 500000.00,
  "start_date": "2025-10-15",
  "end_date": "2025-11-15",
  "target_audience": "Existing customers - Tier 1 cities",
  "goal": "Increase repeat purchases by 30%",
  "content": "Diwali special offers with 40% discount on premium products"
}
```

### Email Templates

**Create Email Template:**
```json
{
  "name": "Welcome Email",
  "subject": "Welcome to NueOne! 🎉",
  "category": "onboarding",
  "body_html": "<h1>Welcome!</h1><p>Thanks for joining us.</p>",
  "body_text": "Welcome! Thanks for joining us.",
  "is_active": true
}
```

### Social Posts

**Create Social Post:**
```json
{
  "title": "Product Launch Announcement",
  "platform": "linkedin",
  "content": "Excited to announce our new product! #Innovation #Tech",
  "status": "scheduled",
  "scheduled_at": "2025-02-01T10:00:00",
  "media_urls": ["https://example.com/image.jpg"]
}
```

### Analytics

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/marketing/analytics/overview` | Overall marketing analytics |
| `GET /api/v1/marketing/analytics/campaign-performance` | Per-campaign performance |
| `GET /api/v1/marketing/analytics/social-summary` | Social media summary |

---

## 🔍 Health Check Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/health` | Basic liveness check |
| `GET /api/v1/health/detailed` | DB + Redis connectivity check |

---

## 🌐 Accessing via Frontend

When using **Next.js with Docker Compose**:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/v1
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc
- **Nginx Proxy**: http://localhost (routes /api/* → backend, /* → frontend)

When using **Nginx Proxy**:
- **Swagger UI**: http://localhost/api/docs (proxied through nginx)
- **All API calls**: http://localhost/api/v1/* (proxied through nginx)

---

## 🐛 Common Issues & Fixes

### 1. 401 Unauthorized
- Make sure you're sending `Authorization: Bearer <token>` header
- Token might be expired — login again
- In Swagger UI, re-authorize with a fresh token

### 2. 422 Validation Error
- FastAPI validates request bodies strictly
- Check the error `detail` array for specific field errors
- Common issues: missing required fields, wrong types, enum values

### 3. 500 Internal Server Error
- Check if PostgreSQL is running: `docker compose ps`
- Check backend logs: `docker compose logs backend`
- Verify DATABASE_URL in .env

### 4. CORS Error (Frontend → Backend)
- Ensure `BACKEND_CORS_ORIGINS` includes your frontend URL
- Default: `http://localhost:3000,http://localhost`

### 5. Database Connection Refused
- PostgreSQL might not be ready yet
- Wait for health check: `docker compose exec db pg_isready`
- Or restart: `docker compose restart backend`

---

## 📋 Quick Test Script (cURL)

```bash
#!/bin/bash
API="http://localhost:8000/api/v1"

echo "=== Health Check ==="
curl -s $API/health | python3 -m json.tool

echo -e "\n=== Register ==="
curl -s -X POST $API/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@nueone.io","password":"demo123","full_name":"Demo User"}' | python3 -m json.tool

echo -e "\n=== Login ==="
TOKEN=$(curl -s -X POST $API/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@nueone.io","password":"demo123"}' | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

echo "Token: ${TOKEN:0:30}..."

echo -e "\n=== Get Profile ==="
curl -s $API/auth/me \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

echo -e "\n=== Create Contact ==="
curl -s -X POST $API/crm/contacts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Rahul","last_name":"Sharma","email":"rahul@example.com","phone":"+91-9876543210"}' | python3 -m json.tool

echo -e "\n=== List Contacts ==="
curl -s "$API/crm/contacts?page=1&page_size=10" \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

echo -e "\n=== ERP Dashboard ==="
curl -s $API/erp/dashboard \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

echo -e "\n=== Finance Dashboard ==="
curl -s $API/finance/dashboard \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

echo -e "\n=== Marketing Dashboard ==="
curl -s $API/marketing/dashboard \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

echo -e "\n✅ All tests complete!"
```

Save as `test-api.sh`, make executable with `chmod +x test-api.sh`, and run!
