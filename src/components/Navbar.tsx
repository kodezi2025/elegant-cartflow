
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { ShoppingBag, Search, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { getCartItemCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're on the homepage
  const isHomePage = location.pathname === "/";
  
  // Track scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled || !isHomePage 
        ? "bg-white/95 backdrop-blur-md shadow-sm py-4" 
        : "bg-transparent py-6"
    )}>
      <div className="container max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-display text-xl font-medium">
            Minimal
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-sm font-medium transition-colors hover:text-primary/70"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-sm font-medium transition-colors hover:text-primary/70"
            >
              Shop
            </Link>
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/search" className="btn-icon">
              <Search className="h-5 w-5" />
            </Link>
            
            <Link to="/wishlist" className="btn-icon relative">
              <Heart className="h-5 w-5" />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium h-5 w-5 flex items-center justify-center rounded-full animate-scale-up">
                  {getWishlistCount()}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="btn-icon relative">
              <ShoppingBag className="h-5 w-5" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium h-5 w-5 flex items-center justify-center rounded-full animate-scale-up">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md animate-fade-in">
          <div className="py-4 px-6 space-y-4">
            <Link 
              to="/" 
              className="block text-base font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block text-base font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/wishlist" 
              className="block text-base font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Wishlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
