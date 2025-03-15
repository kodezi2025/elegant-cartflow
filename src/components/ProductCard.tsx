
import { Product } from "@/lib/types";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className="group animate-fade-up flex flex-col h-full overflow-hidden bg-white rounded-xl border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        <div className="absolute top-4 right-4 z-10">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-white shadow-sm border-muted hover:bg-white"
            onClick={handleToggleWishlist}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
          </Button>
        </div>
        
        {product.featured && (
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow p-4">
        <div className="flex-grow">
          <h3 className="font-medium text-lg line-clamp-1 mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
            {product.shortDescription}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <span className="font-medium">${product.price.toFixed(2)}</span>
          
          <Button 
            size="sm" 
            variant="outline"
            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            {isInCart(product.id) ? "In Cart" : "Add"}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
