
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  rating: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  getCartTotal: () => number;
  getCartItemCount: () => number;
};

export interface OrderDetails {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  orderDetails: OrderDetails;
  orderDate: Date;
}

export type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
};
