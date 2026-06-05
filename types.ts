export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  image: string;
  category: 'sayur' | 'buah' | 'daging' | 'sembako';
  unit: string;
  origin: string;
  isBestSeller?: boolean;
  isPromo?: boolean;
  availableQty: number;
  unitAvailableText: string;
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ActiveTab = 'splash' | 'home' | 'categories' | 'cart' | 'orders' | 'profile' | 'product-detail';

export interface UserAddress {
  label: string; // e.g., 'Rumah (Utama)'
  fullAddress: string; // e.g., 'Jl. Kebon Jeruk No. 12, Jakarta Barat, 11530'
}

export type PaymentMethodId = 'ovo' | 'dana' | 'linkaja';

export interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  logoText: string;
  colorClass: string;
  primary?: boolean;
}

export type OrderStep = 'received' | 'processed' | 'shipping' | 'arrived';

export interface ActiveOrder {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  address: UserAddress;
  paymentMethod: PaymentMethodId;
  status: OrderStep;
  createdAt: string;
  etaTime: string; // e.g. "12:45"
  etaDurationMinutes: number; // e.g. 12
}
