
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 py-6 text-base w-full rounded-full border-muted bg-background/50 backdrop-blur-sm focus-visible:ring-offset-2"
        />
      </div>
    </form>
  );
};

export default SearchBar;
