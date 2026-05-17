// ============================================================================
// ERP Operations — Mock Data (for development before backend is connected)
// ============================================================================

import type {
  Category, Supplier, Warehouse, Product, InventoryItem,
  PurchaseOrder, SalesOrder, LowStockAlert, ErpDashboardData,
} from '../../types/erp-operations';

// ── Categories ──────────────────────────────────────────────────────────────

export const mockCategories: Category[] = [
  { id: 1, name: 'Electronics', description: 'Electronic devices and accessories', slug: 'electronics', parent_id: null, sort_order: 0, is_active: true, created_at: '2024-01-10T10:00:00Z', updated_at: '2024-01-10T10:00:00Z' },
  { id: 2, name: 'Laptops', description: 'Laptop computers', slug: 'laptops', parent_id: 1, sort_order: 1, is_active: true, created_at: '2024-01-10T10:00:00Z', updated_at: '2024-01-10T10:00:00Z' },
  { id: 3, name: 'Mobile Phones', description: 'Smartphones and accessories', slug: 'mobile-phones', parent_id: 1, sort_order: 2, is_active: true, created_at: '2024-01-10T10:00:00Z', updated_at: '2024-01-10T10:00:00Z' },
  { id: 4, name: 'Furniture', description: 'Office and home furniture', slug: 'furniture', parent_id: null, sort_order: 3, is_active: true, created_at: '2024-01-10T10:00:00Z', updated_at: '2024-01-10T10:00:00Z' },
  { id: 5, name: 'Raw Materials', description: 'Raw materials for manufacturing', slug: 'raw-materials', parent_id: null, sort_order: 4, is_active: true, created_at: '2024-01-10T10:00:00Z', updated_at: '2024-01-10T10:00:00Z' },
  { id: 6, name: 'Office Supplies', description: 'Stationery and office consumables', slug: 'office-supplies', parent_id: null, sort_order: 5, is_active: true, created_at: '2024-01-10T10:00:00Z', updated_at: '2024-01-10T10:00:00Z' },
  { id: 7, name: 'Software', description: 'Digital software licenses', slug: 'software', parent_id: null, sort_order: 6, is_active: false, created_at: '2024-01-10T10:00:00Z', updated_at: '2024-01-10T10:00:00Z' },
];

// ── Suppliers ───────────────────────────────────────────────────────────────

export const mockSuppliers: Supplier[] = [
  { id: 1, name: 'TechVista Solutions', code: 'TVS-001', contact_person: 'Rajesh Kumar', email: 'rajesh@techvista.com', phone: '+91-9876543210', address: '123 Industrial Area', city: 'Mumbai', state: 'Maharashtra', country: 'India', postal_code: '400001', website: 'https://techvista.com', tax_id: 'GST27AABCT1234A1Z5', payment_terms: 'Net 30', notes: 'Preferred supplier for electronics', rating: 5, is_active: true, owner_id: 1, created_at: '2024-01-15T10:00:00Z', updated_at: '2024-01-15T10:00:00Z' },
  { id: 2, name: 'Global Materials Ltd', code: 'GML-002', contact_person: 'Priya Sharma', email: 'priya@globalmat.com', phone: '+91-9876543211', address: '456 Trade Zone', city: 'Delhi', state: 'Delhi', country: 'India', postal_code: '110001', website: 'https://globalmat.com', tax_id: 'GST07AABCG5678B2Z3', payment_terms: 'Net 45', notes: 'Bulk material supplier', rating: 4, is_active: true, owner_id: 1, created_at: '2024-01-15T10:00:00Z', updated_at: '2024-01-15T10:00:00Z' },
  { id: 3, name: 'OfficeMart India', code: 'OMI-003', contact_person: 'Amit Patel', email: 'amit@officemart.in', phone: '+91-9876543212', address: '789 Commercial Hub', city: 'Bangalore', state: 'Karnataka', country: 'India', postal_code: '560001', website: 'https://officemart.in', tax_id: 'GST29AABCO9012C3Z1', payment_terms: 'Net 15', notes: '', rating: 3, is_active: true, owner_id: 1, created_at: '2024-01-15T10:00:00Z', updated_at: '2024-01-15T10:00:00Z' },
  { id: 4, name: 'FurniCraft Exports', code: 'FCE-004', contact_person: 'Sneha Desai', email: 'sneha@furnicraft.com', phone: '+91-9876543213', address: '321 Export Zone', city: 'Pune', state: 'Maharashtra', country: 'India', postal_code: '411001', website: 'https://furnicraft.com', tax_id: 'GST27AABCF3456D4Z7', payment_terms: 'Net 60', notes: 'Furniture specialist', rating: 4, is_active: true, owner_id: 1, created_at: '2024-01-15T10:00:00Z', updated_at: '2024-01-15T10:00:00Z' },
  { id: 5, name: 'QuickParts Inc', code: 'QPI-005', contact_person: 'Vikram Singh', email: 'vikram@quickparts.com', phone: '+91-9876543214', address: '555 Industrial Park', city: 'Chennai', state: 'Tamil Nadu', country: 'India', postal_code: '600001', website: 'https://quickparts.com', tax_id: 'GST33AABCQ7890E5Z9', payment_terms: 'COD', notes: 'Small parts supplier', rating: 2, is_active: false, owner_id: 1, created_at: '2024-01-15T10:00:00Z', updated_at: '2024-01-15T10:00:00Z' },
];

// ── Warehouses ──────────────────────────────────────────────────────────────

export const mockWarehouses: Warehouse[] = [
  { id: 1, name: 'Main Warehouse', code: 'WH-MAIN', address: '1 Logistics Park', city: 'Mumbai', state: 'Maharashtra', country: 'India', postal_code: '400076', manager_name: 'Sanjay Mehta', phone: '+91-22-12345678', email: 'warehouse.main@nue1.com', capacity: 10000, is_active: true, notes: 'Primary storage facility', created_at: '2024-01-12T10:00:00Z', updated_at: '2024-01-12T10:00:00Z' },
  { id: 2, name: 'Delhi Distribution Center', code: 'WH-DEL', address: '2 Transport Hub', city: 'Delhi', state: 'Delhi', country: 'India', postal_code: '110020', manager_name: 'Ankit Gupta', phone: '+91-11-12345678', email: 'warehouse.delhi@nue1.com', capacity: 5000, is_active: true, notes: 'North India distribution', created_at: '2024-01-12T10:00:00Z', updated_at: '2024-01-12T10:00:00Z' },
  { id: 3, name: 'Bangalore Tech Hub', code: 'WH-BLR', address: '3 Tech Park', city: 'Bangalore', state: 'Karnataka', country: 'India', postal_code: '560095', manager_name: 'Kavitha Reddy', phone: '+91-80-12345678', email: 'warehouse.blr@nue1.com', capacity: 3000, is_active: true, notes: 'Electronics specialized storage', created_at: '2024-01-12T10:00:00Z', updated_at: '2024-01-12T10:00:00Z' },
  { id: 4, name: 'Cold Storage Unit', code: 'WH-COLD', address: '4 Industrial Area', city: 'Pune', state: 'Maharashtra', country: 'India', postal_code: '411035', manager_name: 'Ramesh Iyer', phone: '+91-20-12345678', email: 'warehouse.cold@nue1.com', capacity: 2000, is_active: true, notes: 'Temperature controlled', created_at: '2024-01-12T10:00:00Z', updated_at: '2024-01-12T10:00:00Z' },
];

// ── Products ────────────────────────────────────────────────────────────────

export const mockProducts: Product[] = [
  { id: 1, name: 'MacBook Pro 16"', sku: 'MBP-16-001', barcode: '8901234567890', product_type: 'physical', category_id: 2, supplier_id: 1, cost_price: 150000, selling_price: 175000, mrp: 199900, tax_rate: 18, unit: 'piece', weight: 2.1, dimensions: '35.5x24.8x1.6', min_stock_level: 5, max_stock_level: 50, track_inventory: true, description: 'Apple MacBook Pro 16 inch M3 Pro', image_url: null, is_active: true, owner_id: 1, created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', category_name: 'Laptops', supplier_name: 'TechVista Solutions' },
  { id: 2, name: 'Dell XPS 15', sku: 'DXPS-15-001', barcode: '8901234567891', product_type: 'physical', category_id: 2, supplier_id: 1, cost_price: 95000, selling_price: 112000, mrp: 125000, tax_rate: 18, unit: 'piece', weight: 1.8, dimensions: '34.4x22.0x1.8', min_stock_level: 8, max_stock_level: 40, track_inventory: true, description: 'Dell XPS 15 OLED', image_url: null, is_active: true, owner_id: 1, created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', category_name: 'Laptops', supplier_name: 'TechVista Solutions' },
  { id: 3, name: 'iPhone 15 Pro', sku: 'IP15P-001', barcode: '8901234567892', product_type: 'physical', category_id: 3, supplier_id: 1, cost_price: 75000, selling_price: 89900, mrp: 99900, tax_rate: 18, unit: 'piece', weight: 0.19, dimensions: '14.6x7.0x0.8', min_stock_level: 20, max_stock_level: 200, track_inventory: true, description: 'Apple iPhone 15 Pro 256GB', image_url: null, is_active: true, owner_id: 1, created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', category_name: 'Mobile Phones', supplier_name: 'TechVista Solutions' },
  { id: 4, name: 'Samsung Galaxy S24 Ultra', sku: 'SGS24U-001', barcode: '8901234567893', product_type: 'physical', category_id: 3, supplier_id: 1, cost_price: 68000, selling_price: 82999, mrp: 94999, tax_rate: 18, unit: 'piece', weight: 0.23, dimensions: '16.2x7.8x0.9', min_stock_level: 15, max_stock_level: 150, track_inventory: true, description: 'Samsung Galaxy S24 Ultra 256GB', image_url: null, is_active: true, owner_id: 1, created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', category_name: 'Mobile Phones', supplier_name: 'TechVista Solutions' },
  { id: 5, name: 'Ergonomic Office Chair', sku: 'EOC-001', barcode: '8901234567894', product_type: 'physical', category_id: 4, supplier_id: 4, cost_price: 8000, selling_price: 12500, mrp: 15000, tax_rate: 18, unit: 'piece', weight: 15, dimensions: '65x65x120', min_stock_level: 10, max_stock_level: 100, track_inventory: true, description: 'Premium ergonomic office chair with lumbar support', image_url: null, is_active: true, owner_id: 1, created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', category_name: 'Furniture', supplier_name: 'FurniCraft Exports' },
  { id: 6, name: 'Standing Desk', sku: 'SD-001', barcode: '8901234567895', product_type: 'physical', category_id: 4, supplier_id: 4, cost_price: 15000, selling_price: 22000, mrp: 25000, tax_rate: 18, unit: 'piece', weight: 30, dimensions: '150x75x120', min_stock_level: 5, max_stock_level: 30, track_inventory: true, description: 'Electric height adjustable standing desk', image_url: null, is_active: true, owner_id: 1, created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', category_name: 'Furniture', supplier_name: 'FurniCraft Exports' },
  { id: 7, name: 'Steel Rods (10mm)', sku: 'SR-10-001', barcode: null, product_type: 'physical', category_id: 5, supplier_id: 2, cost_price: 450, selling_price: 580, mrp: 650, tax_rate: 18, unit: 'kg', weight: 1, dimensions: null, min_stock_level: 500, max_stock_level: 5000, track_inventory: true, description: 'Construction grade steel rods 10mm diameter', image_url: null, is_active: true, owner_id: 1, created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', category_name: 'Raw Materials', supplier_name: 'Global Materials Ltd' },
  { id: 8, name: 'A4 Paper Ream', sku: 'A4R-001', barcode: '8901234567897', product_type: 'physical', category_id: 6, supplier_id: 3, cost_price: 280, selling_price: 350, mrp: 400, tax_rate: 12, unit: 'piece', weight: 2.5, dimensions: '30x21x5', min_stock_level: 50, max_stock_level: 500, track_inventory: true, description: 'Premium A4 80gsm paper ream (500 sheets)', image_url: null, is_active: true, owner_id: 1, created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', category_name: 'Office Supplies', supplier_name: 'OfficeMart India' },
  { id: 9, name: 'Microsoft 365 License', sku: 'MS365-001', barcode: null, product_type: 'digital', category_id: 7, supplier_id: 1, cost_price: 3500, selling_price: 4999, mrp: 5499, tax_rate: 18, unit: 'piece', weight: null, dimensions: null, min_stock_level: 0, max_stock_level: null, track_inventory: false, description: 'Microsoft 365 Business Standard annual license', image_url: null, is_active: true, owner_id: 1, created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', category_name: 'Software', supplier_name: 'TechVista Solutions' },
  { id: 10, name: 'IT Support Service', sku: 'ITS-001', barcode: null, product_type: 'service', category_id: null, supplier_id: null, cost_price: 2000, selling_price: 3500, mrp: null, tax_rate: 18, unit: 'piece', weight: null, dimensions: null, min_stock_level: 0, max_stock_level: null, track_inventory: false, description: 'Monthly IT support and maintenance service', image_url: null, is_active: true, owner_id: 1, created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', category_name: null, supplier_name: null },
];

// ── Inventory ───────────────────────────────────────────────────────────────

export const mockInventory: InventoryItem[] = [
  { id: 1, product_id: 1, warehouse_id: 1, quantity_on_hand: 25, quantity_reserved: 3, quantity_available: 22, quantity_on_order: 10, batch_number: 'BATCH-MBP-2024-01', expiry_date: null, bin_location: 'A1-B1-C1', status: 'in_stock', created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', product_name: 'MacBook Pro 16"', product_sku: 'MBP-16-001', warehouse_name: 'Main Warehouse', min_stock_level: 5 },
  { id: 2, product_id: 2, warehouse_id: 1, quantity_on_hand: 12, quantity_reserved: 2, quantity_available: 10, quantity_on_order: 5, batch_number: 'BATCH-DXPS-2024-01', expiry_date: null, bin_location: 'A1-B1-C2', status: 'in_stock', created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', product_name: 'Dell XPS 15', product_sku: 'DXPS-15-001', warehouse_name: 'Main Warehouse', min_stock_level: 8 },
  { id: 3, product_id: 3, warehouse_id: 3, quantity_on_hand: 45, quantity_reserved: 8, quantity_available: 37, quantity_on_order: 20, batch_number: 'BATCH-IP15-2024-01', expiry_date: null, bin_location: 'B2-C1-D1', status: 'in_stock', created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', product_name: 'iPhone 15 Pro', product_sku: 'IP15P-001', warehouse_name: 'Bangalore Tech Hub', min_stock_level: 20 },
  { id: 4, product_id: 4, warehouse_id: 3, quantity_on_hand: 3, quantity_reserved: 1, quantity_available: 2, quantity_on_order: 15, batch_number: 'BATCH-SGS24-2024-01', expiry_date: null, bin_location: 'B2-C1-D2', status: 'low_stock', created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', product_name: 'Samsung Galaxy S24 Ultra', product_sku: 'SGS24U-001', warehouse_name: 'Bangalore Tech Hub', min_stock_level: 15 },
  { id: 5, product_id: 5, warehouse_id: 1, quantity_on_hand: 28, quantity_reserved: 5, quantity_available: 23, quantity_on_order: 0, batch_number: 'BATCH-EOC-2024-01', expiry_date: null, bin_location: 'C3-A1-B1', status: 'in_stock', created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', product_name: 'Ergonomic Office Chair', product_sku: 'EOC-001', warehouse_name: 'Main Warehouse', min_stock_level: 10 },
  { id: 6, product_id: 6, warehouse_id: 2, quantity_on_hand: 4, quantity_reserved: 1, quantity_available: 3, quantity_on_order: 8, batch_number: 'BATCH-SD-2024-01', expiry_date: null, bin_location: 'C3-A2-B1', status: 'low_stock', created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', product_name: 'Standing Desk', product_sku: 'SD-001', warehouse_name: 'Delhi Distribution Center', min_stock_level: 5 },
  { id: 7, product_id: 7, warehouse_id: 1, quantity_on_hand: 0, quantity_reserved: 0, quantity_available: 0, quantity_on_order: 500, batch_number: null, expiry_date: null, bin_location: 'D1-A1', status: 'out_of_stock', created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', product_name: 'Steel Rods (10mm)', product_sku: 'SR-10-001', warehouse_name: 'Main Warehouse', min_stock_level: 500 },
  { id: 8, product_id: 8, warehouse_id: 2, quantity_on_hand: 120, quantity_reserved: 15, quantity_available: 105, quantity_on_order: 0, batch_number: 'BATCH-A4R-2024-02', expiry_date: null, bin_location: 'E1-B1', status: 'in_stock', created_at: '2024-02-01T10:00:00Z', updated_at: '2024-02-01T10:00:00Z', product_name: 'A4 Paper Ream', product_sku: 'A4R-001', warehouse_name: 'Delhi Distribution Center', min_stock_level: 50 },
];

export const mockLowStockAlerts: LowStockAlert[] = [
  { product_id: 4, product_name: 'Samsung Galaxy S24 Ultra', sku: 'SGS24U-001', warehouse_id: 3, quantity_on_hand: 3, min_stock_level: 15, status: 'low_stock' },
  { product_id: 6, product_name: 'Standing Desk', sku: 'SD-001', warehouse_id: 2, quantity_on_hand: 4, min_stock_level: 5, status: 'low_stock' },
  { product_id: 7, product_name: 'Steel Rods (10mm)', sku: 'SR-10-001', warehouse_id: 1, quantity_on_hand: 0, min_stock_level: 500, status: 'out_of_stock' },
];

// ── Purchase Orders ─────────────────────────────────────────────────────────

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 1, po_number: 'PO-2024-001', supplier_id: 1, warehouse_id: 1, order_date: '2024-03-01', expected_delivery_date: '2024-03-15', actual_delivery_date: null, status: 'approved', subtotal: 3750000, tax_amount: 675000, shipping_cost: 5000, total_amount: 4430000, currency: 'INR', payment_status: 'unpaid', payment_method: 'Bank Transfer', notes: 'Q1 electronics procurement', internal_notes: 'Priority order', items: [
      { id: 1, purchase_order_id: 1, product_id: 1, quantity_ordered: 15, quantity_received: 0, unit_price: 150000, tax_rate: 18, discount_percent: 0, total_price: 2655000, notes: null, created_at: '2024-03-01T10:00:00Z', updated_at: '2024-03-01T10:00:00Z', product_name: 'MacBook Pro 16"', product_sku: 'MBP-16-001' },
      { id: 2, purchase_order_id: 1, product_id: 3, quantity_ordered: 15, quantity_received: 0, unit_price: 75000, tax_rate: 18, discount_percent: 0, total_price: 1327500, notes: null, created_at: '2024-03-01T10:00:00Z', updated_at: '2024-03-01T10:00:00Z', product_name: 'iPhone 15 Pro', product_sku: 'IP15P-001' },
    ], owner_id: 1, created_at: '2024-03-01T10:00:00Z', updated_at: '2024-03-01T10:00:00Z', supplier_name: 'TechVista Solutions', warehouse_name: 'Main Warehouse',
  },
  {
    id: 2, po_number: 'PO-2024-002', supplier_id: 4, warehouse_id: 1, order_date: '2024-03-05', expected_delivery_date: '2024-03-20', actual_delivery_date: '2024-03-19', status: 'received', subtotal: 350000, tax_amount: 63000, shipping_cost: 8000, total_amount: 421000, currency: 'INR', payment_status: 'paid', payment_method: 'Bank Transfer', notes: 'Office furniture restock', internal_notes: null, items: [
      { id: 3, purchase_order_id: 2, product_id: 5, quantity_ordered: 20, quantity_received: 20, unit_price: 8000, tax_rate: 18, discount_percent: 5, total_price: 180400, notes: null, created_at: '2024-03-05T10:00:00Z', updated_at: '2024-03-05T10:00:00Z', product_name: 'Ergonomic Office Chair', product_sku: 'EOC-001' },
      { id: 4, purchase_order_id: 2, product_id: 6, quantity_ordered: 10, quantity_received: 10, unit_price: 15000, tax_rate: 18, discount_percent: 5, total_price: 169650, notes: null, created_at: '2024-03-05T10:00:00Z', updated_at: '2024-03-05T10:00:00Z', product_name: 'Standing Desk', product_sku: 'SD-001' },
    ], owner_id: 1, created_at: '2024-03-05T10:00:00Z', updated_at: '2024-03-05T10:00:00Z', supplier_name: 'FurniCraft Exports', warehouse_name: 'Main Warehouse',
  },
  {
    id: 3, po_number: 'PO-2024-003', supplier_id: 2, warehouse_id: 1, order_date: '2024-03-10', expected_delivery_date: '2024-03-25', actual_delivery_date: null, status: 'submitted', subtotal: 225000, tax_amount: 40500, shipping_cost: 12000, total_amount: 277500, currency: 'INR', payment_status: 'unpaid', payment_method: null, notes: 'Steel rods for construction project', internal_notes: 'Urgent requirement', items: [
      { id: 5, purchase_order_id: 3, product_id: 7, quantity_ordered: 500, quantity_received: 0, unit_price: 450, tax_rate: 18, discount_percent: 0, total_price: 265500, notes: null, created_at: '2024-03-10T10:00:00Z', updated_at: '2024-03-10T10:00:00Z', product_name: 'Steel Rods (10mm)', product_sku: 'SR-10-001' },
    ], owner_id: 1, created_at: '2024-03-10T10:00:00Z', updated_at: '2024-03-10T10:00:00Z', supplier_name: 'Global Materials Ltd', warehouse_name: 'Main Warehouse',
  },
  {
    id: 4, po_number: 'PO-2024-004', supplier_id: 3, warehouse_id: 2, order_date: '2024-03-12', expected_delivery_date: '2024-03-18', actual_delivery_date: null, status: 'draft', subtotal: 42000, tax_amount: 5040, shipping_cost: 2000, total_amount: 49040, currency: 'INR', payment_status: 'unpaid', payment_method: null, notes: 'Office supplies reorder', internal_notes: null, items: [
      { id: 6, purchase_order_id: 4, product_id: 8, quantity_ordered: 120, quantity_received: 0, unit_price: 280, tax_rate: 12, discount_percent: 0, total_price: 37632, notes: null, created_at: '2024-03-12T10:00:00Z', updated_at: '2024-03-12T10:00:00Z', product_name: 'A4 Paper Ream', product_sku: 'A4R-001' },
    ], owner_id: 1, created_at: '2024-03-12T10:00:00Z', updated_at: '2024-03-12T10:00:00Z', supplier_name: 'OfficeMart India', warehouse_name: 'Delhi Distribution Center',
  },
  {
    id: 5, po_number: 'PO-2024-005', supplier_id: 1, warehouse_id: 3, order_date: '2024-02-20', expected_delivery_date: '2024-03-05', actual_delivery_date: '2024-03-04', status: 'cancelled', subtotal: 829990, tax_amount: 149398, shipping_cost: 3000, total_amount: 982388, currency: 'INR', payment_status: 'unpaid', payment_method: null, notes: 'Cancelled due to model upgrade', internal_notes: 'Supplier notified', items: [], owner_id: 1, created_at: '2024-02-20T10:00:00Z', updated_at: '2024-02-25T10:00:00Z', supplier_name: 'TechVista Solutions', warehouse_name: 'Bangalore Tech Hub',
  },
];

// ── Sales Orders ────────────────────────────────────────────────────────────

export const mockSalesOrders: SalesOrder[] = [
  {
    id: 1, so_number: 'SO-2024-001', customer_id: null, contact_id: null, customer_name: 'Acme Corp', warehouse_id: 1, order_date: '2024-03-02', expected_ship_date: '2024-03-08', actual_ship_date: '2024-03-07', delivery_date: '2024-03-09', status: 'delivered', subtotal: 287000, tax_amount: 51660, shipping_cost: 2000, discount_amount: 5000, total_amount: 335660, currency: 'INR', payment_status: 'paid', payment_method: 'UPI', shipping_address: 'Acme Corp, 100 Business Park, Mumbai', billing_address: 'Acme Corp, 100 Business Park, Mumbai', notes: 'Priority delivery', items: [
      { id: 1, sales_order_id: 1, product_id: 2, quantity_ordered: 2, quantity_shipped: 2, quantity_returned: 0, unit_price: 112000, tax_rate: 18, discount_percent: 0, total_price: 264320, notes: null, created_at: '2024-03-02T10:00:00Z', updated_at: '2024-03-02T10:00:00Z', product_name: 'Dell XPS 15', product_sku: 'DXPS-15-001' },
      { id: 2, sales_order_id: 1, product_id: 5, quantity_ordered: 2, quantity_shipped: 2, quantity_returned: 0, unit_price: 12500, tax_rate: 18, discount_percent: 0, total_price: 29500, notes: null, created_at: '2024-03-02T10:00:00Z', updated_at: '2024-03-02T10:00:00Z', product_name: 'Ergonomic Office Chair', product_sku: 'EOC-001' },
    ], owner_id: 1, created_at: '2024-03-02T10:00:00Z', updated_at: '2024-03-09T10:00:00Z', warehouse_name: 'Main Warehouse',
  },
  {
    id: 2, so_number: 'SO-2024-002', customer_id: null, contact_id: null, customer_name: 'StartupXYZ', warehouse_id: 3, order_date: '2024-03-05', expected_ship_date: '2024-03-12', actual_ship_date: null, delivery_date: null, status: 'confirmed', subtotal: 508990, tax_amount: 91618, shipping_cost: 3500, discount_amount: 10000, total_amount: 594108, currency: 'INR', payment_status: 'partial', payment_method: 'Bank Transfer', shipping_address: 'StartupXYZ, 42 Tech Street, Bangalore', billing_address: 'StartupXYZ, 42 Tech Street, Bangalore', notes: 'New client onboarding package', items: [
      { id: 3, sales_order_id: 2, product_id: 3, quantity_ordered: 5, quantity_shipped: 0, quantity_returned: 0, unit_price: 89900, tax_rate: 18, discount_percent: 0, total_price: 530410, notes: null, created_at: '2024-03-05T10:00:00Z', updated_at: '2024-03-05T10:00:00Z', product_name: 'iPhone 15 Pro', product_sku: 'IP15P-001' },
    ], owner_id: 1, created_at: '2024-03-05T10:00:00Z', updated_at: '2024-03-05T10:00:00Z', warehouse_name: 'Bangalore Tech Hub',
  },
  {
    id: 3, so_number: 'SO-2024-003', customer_id: null, contact_id: null, customer_name: 'Walk-in Customer', warehouse_id: 1, order_date: '2024-03-08', expected_ship_date: null, actual_ship_date: null, delivery_date: null, status: 'picking', subtotal: 175000, tax_amount: 31500, shipping_cost: 0, discount_amount: 0, total_amount: 206500, currency: 'INR', payment_status: 'unpaid', payment_method: null, shipping_address: null, billing_address: null, notes: '', items: [
      { id: 4, sales_order_id: 3, product_id: 1, quantity_ordered: 1, quantity_shipped: 0, quantity_returned: 0, unit_price: 175000, tax_rate: 18, discount_percent: 0, total_price: 206500, notes: null, created_at: '2024-03-08T10:00:00Z', updated_at: '2024-03-08T10:00:00Z', product_name: 'MacBook Pro 16"', product_sku: 'MBP-16-001' },
    ], owner_id: 1, created_at: '2024-03-08T10:00:00Z', updated_at: '2024-03-08T10:00:00Z', warehouse_name: 'Main Warehouse',
  },
  {
    id: 4, so_number: 'SO-2024-004', customer_id: null, contact_id: null, customer_name: 'MegaStore Retail', warehouse_id: 2, order_date: '2024-03-10', expected_ship_date: '2024-03-15', actual_ship_date: null, delivery_date: null, status: 'draft', subtotal: 66500, tax_amount: 11970, shipping_cost: 5000, discount_amount: 2000, total_amount: 81470, currency: 'INR', payment_status: 'unpaid', payment_method: null, shipping_address: 'MegaStore, 55 Mall Road, Delhi', billing_address: 'MegaStore, Accounts Dept, Delhi', notes: 'Bulk order - special pricing', items: [
      { id: 5, sales_order_id: 4, product_id: 4, quantity_ordered: 1, quantity_shipped: 0, quantity_returned: 0, unit_price: 66500, tax_rate: 18, discount_percent: 0, total_price: 78470, notes: null, created_at: '2024-03-10T10:00:00Z', updated_at: '2024-03-10T10:00:00Z', product_name: 'Samsung Galaxy S24 Ultra', product_sku: 'SGS24U-001' },
    ], owner_id: 1, created_at: '2024-03-10T10:00:00Z', updated_at: '2024-03-10T10:00:00Z', warehouse_name: 'Delhi Distribution Center',
  },
  {
    id: 5, so_number: 'SO-2024-005', customer_id: null, contact_id: null, customer_name: 'John Smith', warehouse_id: 1, order_date: '2024-02-28', expected_ship_date: '2024-03-05', actual_ship_date: '2024-03-05', delivery_date: '2024-03-06', status: 'returned', subtotal: 12500, tax_amount: 2250, shipping_cost: 500, discount_amount: 0, total_amount: 15250, currency: 'INR', payment_status: 'paid', payment_method: 'Credit Card', shipping_address: 'John Smith, 12 Park Avenue, Mumbai', billing_address: 'John Smith, 12 Park Avenue, Mumbai', notes: 'Customer returned - defective', items: [
      { id: 6, sales_order_id: 5, product_id: 5, quantity_ordered: 1, quantity_shipped: 1, quantity_returned: 1, unit_price: 12500, tax_rate: 18, discount_percent: 0, total_price: 14750, notes: 'Returned due to defect', created_at: '2024-02-28T10:00:00Z', updated_at: '2024-03-06T10:00:00Z', product_name: 'Ergonomic Office Chair', product_sku: 'EOC-001' },
    ], owner_id: 1, created_at: '2024-02-28T10:00:00Z', updated_at: '2024-03-06T10:00:00Z', warehouse_name: 'Main Warehouse',
  },
];

// ── Dashboard ───────────────────────────────────────────────────────────────

export const mockErpDashboard: ErpDashboardData = {
  module: 'erp',
  summary: {
    total_products: 10,
    total_categories: 7,
    total_suppliers: 5,
    total_warehouses: 4,
    low_stock_items: 2,
    out_of_stock_items: 1,
    pending_purchase_orders: 2,
    pending_sales_orders: 3,
    total_inventory_value: 4523000,
  },
};

// ── Helper Functions ────────────────────────────────────────────────────────

export function getProductById(id: number): Product | undefined {
  return mockProducts.find((p) => p.id === id);
}

export function getSupplierById(id: number): Supplier | undefined {
  return mockSuppliers.find((s) => s.id === id);
}

export function getWarehouseById(id: number): Warehouse | undefined {
  return mockWarehouses.find((w) => w.id === id);
}

export function getCategoryById(id: number): Category | undefined {
  return mockCategories.find((c) => c.id === id);
}
