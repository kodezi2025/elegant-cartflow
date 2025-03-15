
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { getProductById, products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft, Star, Minus, Plus, Heart } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const productId = parseInt(id || "0");
  const product = getProductById(productId);
  
  // Get similar products
  const similarProducts = products
    .filter(p => p.category === product?.category && p.id !== productId)
    .slice(0, 4);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Reset quantity when product changes
    setQuantity(1);
    
    // Reset image loaded state
    setIsImageLoaded(false);
  }, [productId]);
  
  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  // Handle wishlist
  const toggleWishlist = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };
  
  // If product not found, navigate back to products
  useEffect(() => {
    if (!product) {
      navigate("/products");
    }
  }, [product, navigate]);
  
  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="section-container">
          {/* Back link */}
          <Link
            to="/products"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to products
          </Link>
          
          {/* Product details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Product image */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary animate-fade-in">
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsImageLoaded(true)}
              />
            </div>
            
            {/* Product info */}
            <div className="flex flex-col space-y-6">
              <div className="space-y-2 animate-fade-up">
                <div className="flex items-center space-x-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                
                <h1 className="text-3xl font-display font-medium">{product.name}</h1>
                
                <p className="text-2xl font-medium">${product.price.toFixed(2)}</p>
                
                <p className="text-muted-foreground">{product.shortDescription}</p>
              </div>
              
              <div className="space-y-4 pt-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                <div className="space-y-2">
                  <h3 className="font-medium">Quantity</h3>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <span className="w-8 text-center">{quantity}</span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={increaseQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center pt-4">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {isInCart(product.id) ? "Update Cart" : "Add to Cart"}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={toggleWishlist}
                  >
                    <Heart 
                      className={`mr-2 h-5 w-5 ${isInWishlist(product.id) ? 'fill-primary text-primary' : ''}`} 
                    />
                    {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                  </Button>
                </div>
              </div>
              
              <div className="border-t border-border pt-6 mt-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">
                  {product.description}
                </p>
              </div>
              
              <div className="border-t border-border pt-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-1">Category</h3>
                    <p className="text-muted-foreground">{product.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Similar products */}
          {similarProducts.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl font-display font-medium mb-8">You may also like</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {similarProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
