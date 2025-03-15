
import { CartItem as CartItemType } from "@/lib/types";
import { useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };
  
  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-6 animate-fade-in border-b border-border">
      <Link 
        to={`/product/${product.id}`}
        className="flex-shrink-0 aspect-square w-24 h-24 rounded-md overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </Link>
      
      <div className="flex flex-col flex-grow space-y-2">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <Link 
            to={`/product/${product.id}`}
            className="font-medium hover:text-primary/80 transition-colors"
          >
            {product.name}
          </Link>
          
          <span className="font-medium">
            ${(product.price * quantity).toFixed(2)}
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-1">
          {product.shortDescription}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleDecreaseQuantity}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-8 text-center">
              {quantity}
            </span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleIncreaseQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={handleRemove}
          >
            <Trash className="h-4 w-4 mr-2" />
            <span>Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
