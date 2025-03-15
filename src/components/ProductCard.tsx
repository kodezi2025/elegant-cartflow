
import { Product } from "@/lib/types";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import { PlusCircle, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart, isInCart } = useCart();
  const alreadyInCart = isInCart(product.id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Calculate delay for staggered animation
  const delay = `${index * 0.1}s`;

  return (
    <div 
      className="product-card group animate-fade-up" 
      style={{ animationDelay: delay }}
    >
      <Link 
        to={`/product/${product.id}`} 
        className="outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
      >
        <div className="product-image-container mb-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300"></div>
          
          <Button 
            variant={alreadyInCart ? "secondary" : "default"}
            size="icon"
            className={`absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              alreadyInCart ? 'bg-primary/10 hover:bg-primary/20' : ''
            }`}
            onClick={handleAddToCart}
          >
            {alreadyInCart ? (
              <Check className="h-5 w-5" />
            ) : (
              <PlusCircle className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <div className="space-y-1">
          <h3 className="font-medium text-base transition-colors group-hover:text-primary/80">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
