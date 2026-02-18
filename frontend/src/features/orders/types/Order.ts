export interface OrderItem {
  itemId: number;
  qty: number;
  price: number;
}

export interface Order {
  id?: string;
  orderDate: string;
  customerId: number;
  customerName?: string;
  orderDetails: OrderItem[];
}
