
import { Product } from "@/lib/types";
import { useWishlist } from "@/lib/WishlistContext";
import { useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import { Trash, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

interface WishlistItemProps {
  product: Product;
}

const WishlistItem = ({ product }: WishlistItemProps) => {
  const { removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  
  const handleRemove = () => {
    removeFromWishlist(product.id);
  };
  
  const handleAddToCart = () => {
    addToCart(product);
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
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-1">
          {product.shortDescription}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="default"
            size="sm"
            onClick={handleAddToCart}
            className="flex gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            {isInCart(product.id) ? "Update Cart" : "Add to Cart"}
          </Button>
          
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

export default WishlistItem;
