export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  shippingAddress: string;
  phoneNumber: string;
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  orderDate: string;
}