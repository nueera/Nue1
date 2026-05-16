"""
ERP Endpoints — Full CRUD
──────────────────────────
Categories, Suppliers, Warehouses, Products, Inventory,
Purchase Orders, Sales Orders, and Dashboard stats.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, case

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.category import Category
from app.models.supplier import Supplier
from app.models.warehouse import Warehouse
from app.models.product import Product
from app.models.inventory import Inventory
from app.models.purchase_order import PurchaseOrder, PurchaseOrderItem
from app.models.sales_order import SalesOrder, SalesOrderItem

from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryResponse
from app.schemas.supplier import SupplierCreate, SupplierUpdate, SupplierResponse
from app.schemas.warehouse import WarehouseCreate, WarehouseUpdate, WarehouseResponse
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.schemas.inventory import InventoryCreate, InventoryUpdate, InventoryResponse
from app.schemas.purchase_order import (
    PurchaseOrderCreate, PurchaseOrderUpdate, PurchaseOrderResponse,
    PurchaseOrderItemCreate, PurchaseOrderItemResponse,
)
from app.schemas.sales_order import (
    SalesOrderCreate, SalesOrderUpdate, SalesOrderResponse,
    SalesOrderItemCreate, SalesOrderItemResponse,
)

router = APIRouter()


# ═══════════════════════════════════════════════════════════
#  DASHBOARD
# ═══════════════════════════════════════════════════════════

@router.get("/dashboard")
async def erp_dashboard(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """ERP module dashboard with key metrics."""
    total_products = await db.scalar(select(func.count(Product.id)))
    total_categories = await db.scalar(select(func.count(Category.id)))
    total_suppliers = await db.scalar(select(func.count(Supplier.id)))
    total_warehouses = await db.scalar(select(func.count(Warehouse.id)))
    low_stock_items = await db.scalar(
        select(func.count(Inventory.id)).where(Inventory.status == "low_stock")
    )
    out_of_stock = await db.scalar(
        select(func.count(Inventory.id)).where(Inventory.status == "out_of_stock")
    )
    pending_pos = await db.scalar(
        select(func.count(PurchaseOrder.id)).where(PurchaseOrder.status.in_(["draft", "submitted", "approved"]))
    )
    pending_sos = await db.scalar(
        select(func.count(SalesOrder.id)).where(SalesOrder.status.in_(["draft", "confirmed", "picking"]))
    )
    total_inventory_value = await db.scalar(
        select(func.coalesce(func.sum(
            Inventory.quantity_on_hand * Product.cost_price
        ), 0))
        .join(Product, Inventory.product_id == Product.id)
    )

    return {
        "module": "erp",
        "summary": {
            "total_products": total_products or 0,
            "total_categories": total_categories or 0,
            "total_suppliers": total_suppliers or 0,
            "total_warehouses": total_warehouses or 0,
            "low_stock_items": low_stock_items or 0,
            "out_of_stock_items": out_of_stock or 0,
            "pending_purchase_orders": pending_pos or 0,
            "pending_sales_orders": pending_sos or 0,
            "total_inventory_value": round(total_inventory_value or 0, 2),
        },
    }


# ═══════════════════════════════════════════════════════════
#  CATEGORIES
# ═══════════════════════════════════════════════════════════

@router.get("/categories", response_model=list[CategoryResponse])
async def list_categories(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(
        select(Category).offset(skip).limit(limit).order_by(Category.sort_order, Category.name)
    )
    return result.scalars().all()


@router.post("/categories", response_model=CategoryResponse, status_code=201)
async def create_category(
    body: CategoryCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    category = Category(**body.model_dump())
    db.add(category)
    await db.flush()
    await db.refresh(category)
    return category


@router.get("/categories/{category_id}", response_model=CategoryResponse)
async def get_category(category_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).where(Category.id == category_id))
    category = result.scalars().first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@router.put("/categories/{category_id}", response_model=CategoryResponse)
async def update_category(category_id: int, body: CategoryUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).where(Category.id == category_id))
    category = result.scalars().first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(category, key, value)
    await db.flush()
    await db.refresh(category)
    return category


@router.delete("/categories/{category_id}", status_code=204)
async def delete_category(category_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).where(Category.id == category_id))
    category = result.scalars().first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    await db.delete(category)


# ═══════════════════════════════════════════════════════════
#  SUPPLIERS
# ═══════════════════════════════════════════════════════════

@router.get("/suppliers", response_model=list[SupplierResponse])
async def list_suppliers(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(
        select(Supplier).offset(skip).limit(limit).order_by(Supplier.name)
    )
    return result.scalars().all()


@router.post("/suppliers", response_model=SupplierResponse, status_code=201)
async def create_supplier(
    body: SupplierCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    supplier = Supplier(**body.model_dump(), owner_id=int(current_user["user_id"]))
    db.add(supplier)
    await db.flush()
    await db.refresh(supplier)
    return supplier


@router.get("/suppliers/{supplier_id}", response_model=SupplierResponse)
async def get_supplier(supplier_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Supplier).where(Supplier.id == supplier_id))
    supplier = result.scalars().first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier


@router.put("/suppliers/{supplier_id}", response_model=SupplierResponse)
async def update_supplier(supplier_id: int, body: SupplierUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Supplier).where(Supplier.id == supplier_id))
    supplier = result.scalars().first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(supplier, key, value)
    await db.flush()
    await db.refresh(supplier)
    return supplier


@router.delete("/suppliers/{supplier_id}", status_code=204)
async def delete_supplier(supplier_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Supplier).where(Supplier.id == supplier_id))
    supplier = result.scalars().first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    await db.delete(supplier)


# ═══════════════════════════════════════════════════════════
#  WAREHOUSES
# ═══════════════════════════════════════════════════════════

@router.get("/warehouses", response_model=list[WarehouseResponse])
async def list_warehouses(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(
        select(Warehouse).offset(skip).limit(limit).order_by(Warehouse.name)
    )
    return result.scalars().all()


@router.post("/warehouses", response_model=WarehouseResponse, status_code=201)
async def create_warehouse(
    body: WarehouseCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    warehouse = Warehouse(**body.model_dump())
    db.add(warehouse)
    await db.flush()
    await db.refresh(warehouse)
    return warehouse


@router.get("/warehouses/{warehouse_id}", response_model=WarehouseResponse)
async def get_warehouse(warehouse_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Warehouse).where(Warehouse.id == warehouse_id))
    warehouse = result.scalars().first()
    if not warehouse:
        raise HTTPException(status_code=404, detail="Warehouse not found")
    return warehouse


@router.put("/warehouses/{warehouse_id}", response_model=WarehouseResponse)
async def update_warehouse(warehouse_id: int, body: WarehouseUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Warehouse).where(Warehouse.id == warehouse_id))
    warehouse = result.scalars().first()
    if not warehouse:
        raise HTTPException(status_code=404, detail="Warehouse not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(warehouse, key, value)
    await db.flush()
    await db.refresh(warehouse)
    return warehouse


@router.delete("/warehouses/{warehouse_id}", status_code=204)
async def delete_warehouse(warehouse_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Warehouse).where(Warehouse.id == warehouse_id))
    warehouse = result.scalars().first()
    if not warehouse:
        raise HTTPException(status_code=404, detail="Warehouse not found")
    await db.delete(warehouse)


# ═══════════════════════════════════════════════════════════
#  PRODUCTS
# ═══════════════════════════════════════════════════════════

@router.get("/products", response_model=list[ProductResponse])
async def list_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    category_id: int | None = Query(None),
    product_type: str | None = Query(None),
    is_active: bool | None = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    query = select(Product).offset(skip).limit(limit).order_by(Product.name)
    if category_id is not None:
        query = query.where(Product.category_id == category_id)
    if product_type is not None:
        query = query.where(Product.product_type == product_type)
    if is_active is not None:
        query = query.where(Product.is_active == is_active)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/products", response_model=ProductResponse, status_code=201)
async def create_product(
    body: ProductCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    product = Product(**body.model_dump(), owner_id=int(current_user["user_id"]))
    db.add(product)
    await db.flush()
    await db.refresh(product)
    return product


@router.get("/products/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalars().first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.put("/products/{product_id}", response_model=ProductResponse)
async def update_product(product_id: int, body: ProductUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalars().first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(product, key, value)
    await db.flush()
    await db.refresh(product)
    return product


@router.delete("/products/{product_id}", status_code=204)
async def delete_product(product_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalars().first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    await db.delete(product)


# ═══════════════════════════════════════════════════════════
#  INVENTORY
# ═══════════════════════════════════════════════════════════

@router.get("/inventory", response_model=list[InventoryResponse])
async def list_inventory(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    warehouse_id: int | None = Query(None),
    status: str | None = Query(None),
    product_id: int | None = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    query = select(Inventory).offset(skip).limit(limit)
    if warehouse_id is not None:
        query = query.where(Inventory.warehouse_id == warehouse_id)
    if status is not None:
        query = query.where(Inventory.status == status)
    if product_id is not None:
        query = query.where(Inventory.product_id == product_id)
    result = await db.execute(query.order_by(Inventory.id))
    return result.scalars().all()


@router.post("/inventory", response_model=InventoryResponse, status_code=201)
async def create_inventory(
    body: InventoryCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    inventory = Inventory(**body.model_dump())
    db.add(inventory)
    await db.flush()
    await db.refresh(inventory)
    return inventory


@router.get("/inventory/{inventory_id}", response_model=InventoryResponse)
async def get_inventory(inventory_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Inventory).where(Inventory.id == inventory_id))
    inventory = result.scalars().first()
    if not inventory:
        raise HTTPException(status_code=404, detail="Inventory record not found")
    return inventory


@router.put("/inventory/{inventory_id}", response_model=InventoryResponse)
async def update_inventory(inventory_id: int, body: InventoryUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Inventory).where(Inventory.id == inventory_id))
    inventory = result.scalars().first()
    if not inventory:
        raise HTTPException(status_code=404, detail="Inventory record not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(inventory, key, value)
    await db.flush()
    await db.refresh(inventory)
    return inventory


@router.get("/inventory/low-stock")
async def get_low_stock_items(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Get all items that are below minimum stock level."""
    result = await db.execute(
        select(Inventory, Product)
        .join(Product, Inventory.product_id == Product.id)
        .where(
            (Inventory.status.in_(["low_stock", "out_of_stock"])) |
            (Inventory.quantity_on_hand <= Product.min_stock_level)
        )
    )
    rows = result.all()
    items = []
    for inv, prod in rows:
        items.append({
            "product_id": prod.id,
            "product_name": prod.name,
            "sku": prod.sku,
            "warehouse_id": inv.warehouse_id,
            "quantity_on_hand": inv.quantity_on_hand,
            "min_stock_level": prod.min_stock_level,
            "status": inv.status,
        })
    return {"low_stock_items": items, "total": len(items)}


# ═══════════════════════════════════════════════════════════
#  PURCHASE ORDERS
# ═══════════════════════════════════════════════════════════

@router.get("/purchase-orders", response_model=list[PurchaseOrderResponse])
async def list_purchase_orders(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    status: str | None = Query(None),
    supplier_id: int | None = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    query = select(PurchaseOrder).offset(skip).limit(limit).order_by(PurchaseOrder.order_date.desc())
    if status:
        query = query.where(PurchaseOrder.status == status)
    if supplier_id:
        query = query.where(PurchaseOrder.supplier_id == supplier_id)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/purchase-orders", response_model=PurchaseOrderResponse, status_code=201)
async def create_purchase_order(
    body: PurchaseOrderCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    items_data = body.model_dump().pop("items", [])
    po = PurchaseOrder(**body.model_dump(exclude={"items"}), owner_id=int(current_user["user_id"]))
    db.add(po)
    await db.flush()

    # Create PO items
    for item_data in body.items:
        item = PurchaseOrderItem(**item_data.model_dump(), purchase_order_id=po.id)
        db.add(item)

    await db.flush()
    await db.refresh(po)
    return po


@router.get("/purchase-orders/{po_id}", response_model=PurchaseOrderResponse)
async def get_purchase_order(po_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PurchaseOrder).where(PurchaseOrder.id == po_id))
    po = result.scalars().first()
    if not po:
        raise HTTPException(status_code=404, detail="Purchase order not found")

    # Get items
    items_result = await db.execute(
        select(PurchaseOrderItem).where(PurchaseOrderItem.purchase_order_id == po_id)
    )
    # Attach items manually for response
    return po


@router.put("/purchase-orders/{po_id}", response_model=PurchaseOrderResponse)
async def update_purchase_order(
    po_id: int,
    body: PurchaseOrderUpdate,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(PurchaseOrder).where(PurchaseOrder.id == po_id))
    po = result.scalars().first()
    if not po:
        raise HTTPException(status_code=404, detail="Purchase order not found")

    update_data = body.model_dump(exclude_unset=True, exclude={"items"})
    for key, value in update_data.items():
        setattr(po, key, value)

    # Update items if provided
    if body.items is not None:
        # Delete existing items
        await db.execute(
            PurchaseOrderItem.__table__.delete().where(
                PurchaseOrderItem.purchase_order_id == po_id
            )
        )
        # Add new items
        for item_data in body.items:
            item = PurchaseOrderItem(**item_data.model_dump(), purchase_order_id=po_id)
            db.add(item)

    await db.flush()
    await db.refresh(po)
    return po


@router.delete("/purchase-orders/{po_id}", status_code=204)
async def delete_purchase_order(po_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PurchaseOrder).where(PurchaseOrder.id == po_id))
    po = result.scalars().first()
    if not po:
        raise HTTPException(status_code=404, detail="Purchase order not found")
    # Delete items first
    await db.execute(
        PurchaseOrderItem.__table__.delete().where(
            PurchaseOrderItem.purchase_order_id == po_id
        )
    )
    await db.delete(po)


# ═══════════════════════════════════════════════════════════
#  SALES ORDERS
# ═══════════════════════════════════════════════════════════

@router.get("/sales-orders", response_model=list[SalesOrderResponse])
async def list_sales_orders(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    status: str | None = Query(None),
    customer_id: int | None = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    query = select(SalesOrder).offset(skip).limit(limit).order_by(SalesOrder.order_date.desc())
    if status:
        query = query.where(SalesOrder.status == status)
    if customer_id:
        query = query.where(SalesOrder.customer_id == customer_id)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/sales-orders", response_model=SalesOrderResponse, status_code=201)
async def create_sales_order(
    body: SalesOrderCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    so = SalesOrder(**body.model_dump(exclude={"items"}), owner_id=int(current_user["user_id"]))
    db.add(so)
    await db.flush()

    # Create SO items
    for item_data in body.items:
        item = SalesOrderItem(**item_data.model_dump(), sales_order_id=so.id)
        db.add(item)

    await db.flush()
    await db.refresh(so)
    return so


@router.get("/sales-orders/{so_id}", response_model=SalesOrderResponse)
async def get_sales_order(so_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SalesOrder).where(SalesOrder.id == so_id))
    so = result.scalars().first()
    if not so:
        raise HTTPException(status_code=404, detail="Sales order not found")
    return so


@router.put("/sales-orders/{so_id}", response_model=SalesOrderResponse)
async def update_sales_order(
    so_id: int,
    body: SalesOrderUpdate,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(SalesOrder).where(SalesOrder.id == so_id))
    so = result.scalars().first()
    if not so:
        raise HTTPException(status_code=404, detail="Sales order not found")

    update_data = body.model_dump(exclude_unset=True, exclude={"items"})
    for key, value in update_data.items():
        setattr(so, key, value)

    # Update items if provided
    if body.items is not None:
        await db.execute(
            SalesOrderItem.__table__.delete().where(
                SalesOrderItem.sales_order_id == so_id
            )
        )
        for item_data in body.items:
            item = SalesOrderItem(**item_data.model_dump(), sales_order_id=so_id)
            db.add(item)

    await db.flush()
    await db.refresh(so)
    return so


@router.delete("/sales-orders/{so_id}", status_code=204)
async def delete_sales_order(so_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SalesOrder).where(SalesOrder.id == so_id))
    so = result.scalars().first()
    if not so:
        raise HTTPException(status_code=404, detail="Sales order not found")
    await db.execute(
        SalesOrderItem.__table__.delete().where(
            SalesOrderItem.sales_order_id == so_id
        )
    )
    await db.delete(so)
