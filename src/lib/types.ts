
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
