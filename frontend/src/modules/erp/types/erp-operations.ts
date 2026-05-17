// ============================================================================
// ERP Operations — TypeScript Types
// ============================================================================
// Matches the FastAPI backend schemas for all 7 ERP entities
// ============================================================================

// ── Category ────────────────────────────────────────────────────────────────

export interface Category {
  id: number;
  name: string;
  description?: string | null;
  slug?: string | null;
  parent_id?: number | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryCreate {
  name: string;
  description?: string | null;
  slug?: string | null;
  parent_id?: number | null;
  sort_order?: number;
  is_active?: boolean;
}

export interface CategoryUpdate {
  name?: string;
  description?: string | null;
  slug?: string | null;
  parent_id?: number | null;
  sort_order?: number;
  is_active?: boolean;
}

// ── Supplier ────────────────────────────────────────────────────────────────

export interface Supplier {
  id: number;
  name: string;
  code?: string | null;
  contact_person?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postal_code?: string | null;
  website?: string | null;
  tax_id?: string | null;
  payment_terms?: string | null;
  notes?: string | null;
  rating?: number | null;
  is_active: boolean;
  owner_id?: number | null;
  created_at: string;
  updated_at: string;
}

export interface SupplierCreate {
  name: string;
  code?: string | null;
  contact_person?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postal_code?: string | null;
  website?: string | null;
  tax_id?: string | null;
  payment_terms?: string | null;
  notes?: string | null;
  rating?: number | null;
  is_active?: boolean;
}

export interface SupplierUpdate {
  name?: string;
  code?: string | null;
  contact_person?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postal_code?: string | null;
  website?: string | null;
  tax_id?: string | null;
  payment_terms?: string | null;
  notes?: string | null;
  rating?: number | null;
  is_active?: boolean;
}

// ── Warehouse ───────────────────────────────────────────────────────────────

export interface Warehouse {
  id: number;
  name: string;
  code?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postal_code?: string | null;
  manager_name?: string | null;
  phone?: string | null;
  email?: string | null;
  capacity?: number | null;
  is_active: boolean;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface WarehouseCreate {
  name: string;
  code?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postal_code?: string | null;
  manager_name?: string | null;
  phone?: string | null;
  email?: string | null;
  capacity?: number | null;
  is_active?: boolean;
  notes?: string | null;
}

export interface WarehouseUpdate {
  name?: string;
  code?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postal_code?: string | null;
  manager_name?: string | null;
  phone?: string | null;
  email?: string | null;
  capacity?: number | null;
  is_active?: boolean;
  notes?: string | null;
}

// ── Product ─────────────────────────────────────────────────────────────────

export type ProductType = 'physical' | 'digital' | 'service' | 'bundle';
export type ProductUnit = 'piece' | 'kg' | 'liter' | 'meter';

export interface Product {
  id: number;
  name: string;
  sku: string;
  barcode?: string | null;
  product_type: ProductType;
  category_id?: number | null;
  supplier_id?: number | null;
  cost_price?: number | null;
  selling_price?: number | null;
  mrp?: number | null;
  tax_rate?: number | null;
  unit: ProductUnit;
  weight?: number | null;
  dimensions?: string | null;
  min_stock_level: number;
  max_stock_level?: number | null;
  track_inventory: boolean;
  description?: string | null;
  image_url?: string | null;
  is_active: boolean;
  owner_id?: number | null;
  created_at: string;
  updated_at: string;
  category_name?: string | null;
  supplier_name?: string | null;
}

export interface ProductCreate {
  name: string;
  sku: string;
  barcode?: string | null;
  product_type?: ProductType;
  category_id?: number | null;
  supplier_id?: number | null;
  cost_price?: number | null;
  selling_price?: number | null;
  mrp?: number | null;
  tax_rate?: number | null;
  unit?: ProductUnit;
  weight?: number | null;
  dimensions?: string | null;
  min_stock_level?: number;
  max_stock_level?: number | null;
  track_inventory?: boolean;
  description?: string | null;
  image_url?: string | null;
  is_active?: boolean;
}

export interface ProductUpdate {
  name?: string;
  sku?: string;
  barcode?: string | null;
  product_type?: ProductType;
  category_id?: number | null;
  supplier_id?: number | null;
  cost_price?: number | null;
  selling_price?: number | null;
  mrp?: number | null;
  tax_rate?: number | null;
  unit?: ProductUnit;
  weight?: number | null;
  dimensions?: string | null;
  min_stock_level?: number;
  max_stock_level?: number | null;
  track_inventory?: boolean;
  description?: string | null;
  image_url?: string | null;
  is_active?: boolean;
}

// ── Inventory ───────────────────────────────────────────────────────────────

export type InventoryStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued';

export interface InventoryItem {
  id: number;
  product_id: number;
  warehouse_id: number;
  quantity_on_hand: number;
  quantity_reserved: number;
  quantity_available: number;
  quantity_on_order: number;
  batch_number?: string | null;
  expiry_date?: string | null;
  bin_location?: string | null;
  status: InventoryStatus;
  created_at: string;
  updated_at: string;
  product_name?: string | null;
  product_sku?: string | null;
  warehouse_name?: string | null;
  min_stock_level?: number;
}

export interface InventoryCreate {
  product_id: number;
  warehouse_id: number;
  quantity_on_hand?: number;
  quantity_reserved?: number;
  quantity_available?: number;
  quantity_on_order?: number;
  batch_number?: string | null;
  expiry_date?: string | null;
  bin_location?: string | null;
  status?: InventoryStatus;
}

export interface InventoryUpdate {
  quantity_on_hand?: number;
  quantity_reserved?: number;
  quantity_available?: number;
  quantity_on_order?: number;
  batch_number?: string | null;
  expiry_date?: string | null;
  bin_location?: string | null;
  status?: InventoryStatus;
}

export interface LowStockAlert {
  product_id: number;
  product_name: string;
  sku: string;
  warehouse_id: number;
  quantity_on_hand: number;
  min_stock_level: number;
  status: InventoryStatus;
}

// ── Purchase Order ──────────────────────────────────────────────────────────

export type POStatus = 'draft' | 'submitted' | 'approved' | 'partial' | 'received' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'partial' | 'paid';

export interface PurchaseOrderItem {
  id: number;
  purchase_order_id: number;
  product_id: number;
  quantity_ordered: number;
  quantity_received: number;
  unit_price: number;
  tax_rate: number;
  discount_percent: number;
  total_price: number;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  product_name?: string | null;
  product_sku?: string | null;
}

export interface PurchaseOrder {
  id: number;
  po_number: string;
  supplier_id: number;
  warehouse_id: number;
  order_date: string;
  expected_delivery_date?: string | null;
  actual_delivery_date?: string | null;
  status: POStatus;
  subtotal: number;
  tax_amount: number;
  shipping_cost: number;
  total_amount: number;
  currency: string;
  payment_status: PaymentStatus;
  payment_method?: string | null;
  notes?: string | null;
  internal_notes?: string | null;
  items: PurchaseOrderItem[];
  owner_id?: number | null;
  created_at: string;
  updated_at: string;
  supplier_name?: string | null;
  warehouse_name?: string | null;
}

export interface PurchaseOrderItemCreate {
  product_id: number;
  quantity_ordered: number;
  unit_price: number;
  tax_rate?: number;
  discount_percent?: number;
  total_price: number;
  notes?: string | null;
}

export interface PurchaseOrderCreate {
  po_number: string;
  supplier_id: number;
  warehouse_id: number;
  order_date: string;
  expected_delivery_date?: string | null;
  status?: POStatus;
  subtotal?: number;
  tax_amount?: number;
  shipping_cost?: number;
  total_amount?: number;
  currency?: string;
  payment_status?: PaymentStatus;
  payment_method?: string | null;
  notes?: string | null;
  internal_notes?: string | null;
  items?: PurchaseOrderItemCreate[];
}

export interface PurchaseOrderUpdate {
  po_number?: string;
  supplier_id?: number;
  warehouse_id?: number;
  order_date?: string;
  expected_delivery_date?: string | null;
  actual_delivery_date?: string | null;
  status?: POStatus;
  subtotal?: number;
  tax_amount?: number;
  shipping_cost?: number;
  total_amount?: number;
  currency?: string;
  payment_status?: PaymentStatus;
  payment_method?: string | null;
  notes?: string | null;
  internal_notes?: string | null;
  items?: PurchaseOrderItemCreate[] | null;
}

// ── Sales Order ─────────────────────────────────────────────────────────────

export type SOStatus = 'draft' | 'confirmed' | 'picking' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

export interface SalesOrderItem {
  id: number;
  sales_order_id: number;
  product_id: number;
  quantity_ordered: number;
  quantity_shipped: number;
  quantity_returned: number;
  unit_price: number;
  tax_rate: number;
  discount_percent: number;
  total_price: number;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  product_name?: string | null;
  product_sku?: string | null;
}

export interface SalesOrder {
  id: number;
  so_number: string;
  customer_id?: number | null;
  contact_id?: number | null;
  customer_name?: string | null;
  warehouse_id: number;
  order_date: string;
  expected_ship_date?: string | null;
  actual_ship_date?: string | null;
  delivery_date?: string | null;
  status: SOStatus;
  subtotal: number;
  tax_amount: number;
  shipping_cost: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  payment_status: PaymentStatus;
  payment_method?: string | null;
  shipping_address?: string | null;
  billing_address?: string | null;
  notes?: string | null;
  items: SalesOrderItem[];
  owner_id?: number | null;
  created_at: string;
  updated_at: string;
  warehouse_name?: string | null;
}

export interface SalesOrderItemCreate {
  product_id: number;
  quantity_ordered: number;
  unit_price: number;
  tax_rate?: number;
  discount_percent?: number;
  total_price: number;
  notes?: string | null;
}

export interface SalesOrderCreate {
  so_number: string;
  customer_id?: number | null;
  contact_id?: number | null;
  customer_name?: string | null;
  warehouse_id: number;
  order_date: string;
  expected_ship_date?: string | null;
  delivery_date?: string | null;
  status?: SOStatus;
  subtotal?: number;
  tax_amount?: number;
  shipping_cost?: number;
  discount_amount?: number;
  total_amount?: number;
  currency?: string;
  payment_status?: PaymentStatus;
  payment_method?: string | null;
  shipping_address?: string | null;
  billing_address?: string | null;
  notes?: string | null;
  items?: SalesOrderItemCreate[];
}

export interface SalesOrderUpdate {
  so_number?: string;
  customer_id?: number | null;
  contact_id?: number | null;
  customer_name?: string | null;
  warehouse_id?: number;
  order_date?: string;
  expected_ship_date?: string | null;
  actual_ship_date?: string | null;
  delivery_date?: string | null;
  status?: SOStatus;
  subtotal?: number;
  tax_amount?: number;
  shipping_cost?: number;
  discount_amount?: number;
  total_amount?: number;
  currency?: string;
  payment_status?: PaymentStatus;
  payment_method?: string | null;
  shipping_address?: string | null;
  billing_address?: string | null;
  notes?: string | null;
  items?: SalesOrderItemCreate[] | null;
}

// ── Dashboard ───────────────────────────────────────────────────────────────

export interface ErpDashboardData {
  module: string;
  summary: {
    total_products: number;
    total_categories: number;
    total_suppliers: number;
    total_warehouses: number;
    low_stock_items: number;
    out_of_stock_items: number;
    pending_purchase_orders: number;
    pending_sales_orders: number;
    total_inventory_value: number;
  };
}
