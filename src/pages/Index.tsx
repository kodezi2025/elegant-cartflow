
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import FeaturedProduct from "@/components/FeaturedProduct";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import { getFeaturedProducts, products } from "@/lib/data";

const Index = () => {
  const featuredProducts = getFeaturedProducts();

  // Add scroll up animation when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1588200618450-3a5b1d3b9aa5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Minimal interior"
            className="w-full h-full object-cover fade-mask"
          />
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
        </div>

        <div className="container mx-auto px-6 sm:px-8 z-10 mt-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight animate-fade-up">
              Beautifully Crafted, Thoughtfully Designed
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Discover our curated collection of minimal products that combine form, function, and simplicity.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/products">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href="#featured">
                  Explore Featured
                  <ArrowDown className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">
            Discover our most popular designs, selected for their exceptional quality and style.
          </p>
        </div>

        <div className="space-y-20">
          {featuredProducts.map((product, index) => (
            <FeaturedProduct 
              key={product.id} 
              product={product} 
              reversed={index % 2 !== 0}
            />
          ))}
        </div>
      </section>

      {/* Recent Products Section */}
      <section className="section-container bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle">
            The latest additions to our collection, crafted with care and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="section-container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display text-lg font-medium mb-4">Minimal</h3>
              <p className="text-muted-foreground">
                Beautifully crafted products for a more thoughtful home.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Newsletter</h3>
              <p className="text-muted-foreground mb-4">
                Subscribe to receive updates on new products and special promotions.
              </p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="max-w-xs"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Minimal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

// Import for Input component used in the footer
import { Input } from "@/components/ui/input";
