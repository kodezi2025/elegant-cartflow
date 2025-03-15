
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { products } from "@/lib/data";
import { Product } from "@/lib/types";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Filter products based on search query
    if (query) {
      const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="section-container">
          <div className="mb-8">
            <SearchBar />
          </div>
          
          <div className="mb-12">
            <h1 className="section-title">Search Results</h1>
            {query && (
              <p className="section-subtitle">
                {searchResults.length} results for "{query}"
              </p>
            )}
          </div>
          
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {searchResults.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-xl font-medium mb-2">No results found</h2>
              <p className="text-muted-foreground">
                Try searching for something else or browse our products
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
