
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/CartContext";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, ShoppingBasket } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { OrderDetails } from "@/lib/types";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Cart = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: ""
  });
  
  // Add scroll up animation when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle proceeding to checkout
  const handleProceedToCheckout = () => {
    setIsCheckingOut(true);
  };
  
  // Mock API call to place order
  const placeOrder = async () => {
    // Validate all fields are filled
    const requiredFields = Object.entries(orderDetails).filter(([_, value]) => !value);
    
    if (requiredFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order object
      const order = {
        id: `ORD-${Date.now()}`,
        items: [...cart],
        totalAmount: getCartTotal(),
        orderDetails,
        orderDate: new Date()
      };
      
      // Clear cart and navigate to success
      clearCart();
      toast.success("Order placed successfully!");
      setIsProcessing(false);
      setIsCheckingOut(false);
      
      // In a real app, we'd store the order in a database
      // For now, let's just print it to console
      console.log("Order placed:", order);
      
      // Navigate to products page
      navigate("/products");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("There was an error placing your order. Please try again.");
      setIsProcessing(false);
    }
  };
  
  // Cancel checkout
  const cancelCheckout = () => {
    setIsCheckingOut(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="section-title">Your Cart</h1>
            <p className="section-subtitle">
              {isCheckingOut ? "Complete your order" : "Review your items before checkout"}
            </p>
          </div>
          
          {cart.length > 0 ? (
            isCheckingOut ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Order form */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                    <h2 className="font-display text-xl font-medium mb-6">
                      Shipping Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium">
                          First Name
                        </label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={orderDetails.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium">
                          Last Name
                        </label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={orderDetails.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={orderDetails.email}
                          onChange={handleInputChange}
                          placeholder="john.doe@example.com"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="address" className="text-sm font-medium">
                          Address
                        </label>
                        <Input
                          id="address"
                          name="address"
                          value={orderDetails.address}
                          onChange={handleInputChange}
                          placeholder="123 Main St"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="city" className="text-sm font-medium">
                          City
                        </label>
                        <Input
                          id="city"
                          name="city"
                          value={orderDetails.city}
                          onChange={handleInputChange}
                          placeholder="New York"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="state" className="text-sm font-medium">
                          State
                        </label>
                        <Input
                          id="state"
                          name="state"
                          value={orderDetails.state}
                          onChange={handleInputChange}
                          placeholder="NY"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="zipCode" className="text-sm font-medium">
                          ZIP Code
                        </label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={orderDetails.zipCode}
                          onChange={handleInputChange}
                          placeholder="10001"
                          required
                        />
                      </div>
                    </div>
                    
                    <h2 className="font-display text-xl font-medium mb-6 mt-8">
                      Payment Information
                    </h2>
                    
                    <Alert className="mb-6">
                      <AlertDescription>
                        This is a demo application. Do not enter real payment information.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="cardNumber" className="text-sm font-medium">
                          Card Number
                        </label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={orderDetails.cardNumber}
                          onChange={handleInputChange}
                          placeholder="4111 1111 1111 1111"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="cardName" className="text-sm font-medium">
                          Name on Card
                        </label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={orderDetails.cardName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="cardExpiry" className="text-sm font-medium">
                          Expiry Date
                        </label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          value={orderDetails.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="cardCvc" className="text-sm font-medium">
                          CVC
                        </label>
                        <Input
                          id="cardCvc"
                          name="cardCvc"
                          value={orderDetails.cardCvc}
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                        />
                      </div>
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
                    
                    <div className="flex flex-col gap-2 mt-6">
                      <Button
                        size="lg"
                        className="w-full"
                        onClick={placeOrder}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <span className="animate-spin mr-2">⚬</span>
                            Processing...
                          </>
                        ) : (
                          <>
                            Complete Order
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={cancelCheckout}
                        disabled={isProcessing}
                      >
                        Back to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
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
                      onClick={handleProceedToCheckout}
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )
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
