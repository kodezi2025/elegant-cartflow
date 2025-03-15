
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/CartContext";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, ShoppingBasket } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  
  // Add scroll up animation when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Handle checkout
  const handleCheckout = () => {
    toast.success("Order placed successfully!");
    clearCart();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="section-title">Your Cart</h1>
            <p className="section-subtitle">
              Review your items before checkout
            </p>
          </div>
          
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-display text-xl font-medium">
                      Items ({cart.length})
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={clearCart}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      Clear Cart
                    </Button>
                  </div>
                  
                  <div className="divide-y divide-border">
                    {cart.map(item => (
                      <CartItem key={item.product.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-border p-6 sticky top-28">
                  <h2 className="font-display text-xl font-medium mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    
                    <div className="border-t border-border pt-4 flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button
                    size="lg"
                    className="w-full mt-6"
                    onClick={handleCheckout}
                  >
                    Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 space-y-6 animate-fade-up">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                <ShoppingBasket className="h-8 w-8 text-muted-foreground" />
              </div>
              
              <h2 className="text-xl font-medium">Your cart is empty</h2>
              
              <p className="text-muted-foreground max-w-md mx-auto">
                Looks like you haven't added any products to your cart yet.
              </p>
              
              <Button asChild size="lg" className="mt-4">
                <Link to="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cart;
