#!/bin/bash
# ============================================================================
# NueOne API Quick Test Script
# ============================================================================
# Usage: chmod +x test-api.sh && ./test-api.sh
# Requires: curl, python3
# ============================================================================

API="${API_URL:-http://localhost:8000/api/v1}"

echo "========================================="
echo "  NueOne API — Quick Test"
echo "========================================="
echo "API Base: $API"
echo ""

echo "=== 1. Health Check ==="
curl -s $API/health | python3 -m json.tool 2>/dev/null || echo "❌ Backend not reachable!"

echo -e "\n=== 2. Register User ==="
curl -s -X POST $API/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@nueone.io","password":"demo123","full_name":"Demo User"}' | python3 -m json.tool 2>/dev/null || echo "User may already exist, continuing..."

echo -e "\n=== 3. Login ==="
LOGIN_RESP=$(curl -s -X POST $API/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@nueone.io","password":"demo123"}')

TOKEN=$(echo $LOGIN_RESP | python3 -c "import sys,json; print(json.load(sys.stdin).get('access_token',''))" 2>/dev/null)

if [ -z "$TOKEN" ]; then
  echo "❌ Login failed! Response: $LOGIN_RESP"
  exit 1
fi

echo "✅ Token: ${TOKEN:0:30}..."

echo -e "\n=== 4. Get Profile ==="
curl -s $API/auth/me \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

echo -e "\n=== 5. CRM — Create Contact ==="
curl -s -X POST $API/crm/contacts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Rahul","last_name":"Sharma","email":"rahul@example.com","phone":"+91-9876543210","source":"website"}' | python3 -m json.tool

echo -e "\n=== 6. CRM — List Contacts ==="
curl -s "$API/crm/contacts?page=1&page_size=5" \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

echo -e "\n=== 7. ERP — Dashboard ==="
curl -s $API/erp/dashboard \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool 2>/dev/null || echo "Dashboard endpoint needs seeded data"

echo -e "\n=== 8. Finance — Dashboard ==="
curl -s $API/finance/dashboard \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool 2>/dev/null || echo "Dashboard endpoint needs seeded data"

echo -e "\n=== 9. Marketing — Dashboard ==="
curl -s $API/marketing/dashboard \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool 2>/dev/null || echo "Dashboard endpoint needs seeded data"

echo -e "\n========================================="
echo "  ✅ All tests complete!"
echo "========================================="
