
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useWishlist } from "@/lib/WishlistContext";
import WishlistItem from "@/components/WishlistItem";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart } from "lucide-react";

const Wishlist = () => {
  const { wishlist, clearWishlist } = useWishlist();
  
  // Add scroll up animation when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="section-title">Your Wishlist</h1>
            <p className="section-subtitle">
              Items you've saved for later
            </p>
          </div>
          
          {wishlist.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-xl font-medium">
                  Saved Items ({wishlist.length})
                </h2>
                <Button
                  variant="ghost"
                  onClick={clearWishlist}
                  className="text-muted-foreground hover:text-destructive"
                >
                  Clear Wishlist
                </Button>
              </div>
              
              <div className="divide-y divide-border">
                {wishlist.map(product => (
                  <WishlistItem key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 space-y-6 animate-fade-up">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                <Heart className="h-8 w-8 text-muted-foreground" />
              </div>
              
              <h2 className="text-xl font-medium">Your wishlist is empty</h2>
              
              <p className="text-muted-foreground max-w-md mx-auto">
                Save items you like for future reference or purchase
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

export default Wishlist;
