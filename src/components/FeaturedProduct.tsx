
import { Product } from "@/lib/types";
import { useCart } from "@/lib/CartContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedProductProps {
  product: Product;
  reversed?: boolean;
}

const FeaturedProduct = ({ product, reversed = false }: FeaturedProductProps) => {
  const { addToCart, isInCart } = useCart();
  const alreadyInCart = isInCart(product.id);
  
  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12",
      reversed ? "md:flex-row-reverse" : ""
    )}>
      <div className={cn(
        "animate-fade-up space-y-4",
        reversed ? "md:order-2" : "md:order-1"
      )}>
        <div className="space-y-2">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Featured
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium tracking-tight">
            {product.name}
          </h2>
        </div>
        
        <p className="text-muted-foreground text-lg leading-relaxed">
          {product.shortDescription}
        </p>
        
        <div className="text-xl font-medium pt-2">
          ${product.price.toFixed(2)}
        </div>
        
        <div className="flex flex-wrap gap-4 pt-2">
          <Button 
            size="lg" 
            onClick={handleAddToCart}
            className="group"
            variant={alreadyInCart ? "outline" : "default"}
          >
            {alreadyInCart ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Add to Cart</span>
              </>
            )}
          </Button>
          
          <Button size="lg" variant="outline" asChild>
            <Link to={`/product/${product.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
      
      <div className={cn(
        "product-image-container animate-fade-in",
        reversed ? "md:order-1" : "md:order-2"
      )}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/5"></div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
