
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products, searchProducts } from "@/lib/data";
import { Product } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  
  const location = useLocation();
  
  // Get unique categories
  const categories = ["all", ...new Set(products.map(p => p.category))];
  
  // Extract search query from URL
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search");
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);
  
  // Filter products based on search, category, and price
  useEffect(() => {
    let result = products;
    
    // Apply search filter
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }
    
    // Apply category filter
    if (categoryFilter && categoryFilter !== "all") {
      result = result.filter(p => p.category === categoryFilter);
    }
    
    // Apply price filter
    if (priceRange !== "all") {
      switch(priceRange) {
        case "under50":
          result = result.filter(p => p.price < 50);
          break;
        case "50to100":
          result = result.filter(p => p.price >= 50 && p.price <= 100);
          break;
        case "100to150":
          result = result.filter(p => p.price > 100 && p.price <= 150);
          break;
        case "over150":
          result = result.filter(p => p.price > 150);
          break;
      }
    }
    
    setFilteredProducts(result);
  }, [searchQuery, categoryFilter, priceRange]);
  
  // Reset filters
  const resetFilters = () => {
    setCategoryFilter("all");
    setPriceRange("all");
    setSearchQuery("");
  };

  // Add scroll up animation when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="section-container">
          <div className="flex flex-col items-center text-center mb-12 space-y-4">
            <h1 className="section-title">Our Collection</h1>
            <p className="section-subtitle max-w-2xl">
              Browse our carefully curated selection of minimal products, designed to bring calm and beauty to your everyday life.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="md:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <div className={`flex-col gap-4 md:flex-row ${showFilters ? 'flex' : 'hidden md:flex'}`}>
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="min-w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={priceRange}
                    onValueChange={setPriceRange}
                  >
                    <SelectTrigger className="min-w-[180px]">
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under50">Under $50</SelectItem>
                      <SelectItem value="50to100">$50 - $100</SelectItem>
                      <SelectItem value="100to150">$100 - $150</SelectItem>
                      <SelectItem value="over150">Over $150</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {(categoryFilter !== "all" || priceRange !== "all" || searchQuery) && (
                    <Button 
                      variant="ghost" 
                      onClick={resetFilters}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mb-6 text-muted-foreground">
            Showing {filteredProducts.length} products
          </div>
          
          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground mb-4">
                No products found matching your criteria.
              </p>
              <Button onClick={resetFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Products;
