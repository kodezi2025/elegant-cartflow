
import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: "Minimal Desk Lamp",
    price: 89.99,
    shortDescription: "Perfect illumination for your workspace",
    description: "This elegant desk lamp combines minimal design with maximum functionality. The adjustable arm and dimmable LED light give you perfect control over your workspace lighting. Made from high-quality aluminum with a matte finish.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Home Office",
    rating: 4.8,
    featured: true
  },
  {
    id: 2,
    name: "Leather Notebook",
    price: 29.99,
    shortDescription: "Timeless elegance for your thoughts",
    description: "Capture your ideas in this premium leather notebook featuring 240 pages of acid-free paper. The minimalist design is complemented by the tactile experience of writing on high-quality paper, while the leather cover develops a beautiful patina over time.",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Stationery",
    rating: 4.5
  },
  {
    id: 3,
    name: "Minimalist Watch",
    price: 149.99,
    shortDescription: "Understated luxury for your wrist",
    description: "This minimalist timepiece features a clean dial with subtle hour markers and a premium leather strap. The Swiss movement ensures precise timekeeping, while the sapphire crystal protects against scratches. Water-resistant to 50 meters.",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Accessories",
    rating: 4.9,
    featured: true
  },
  {
    id: 4,
    name: "Ceramic Coffee Set",
    price: 69.99,
    shortDescription: "Elevate your morning ritual",
    description: "This handcrafted ceramic coffee set includes two mugs and a matching pour-over coffee maker. Each piece is individually made and features a unique glaze pattern. The ergonomic design makes brewing and enjoying your coffee a sensory pleasure.",
    image: "https://images.unsplash.com/photo-1579273166652-d725a4e2c585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Kitchen",
    rating: 4.6
  },
  {
    id: 5,
    name: "Wool Throw Blanket",
    price: 119.99,
    shortDescription: "Luxurious comfort for cool evenings",
    description: "Wrap yourself in the luxurious warmth of this 100% Merino wool throw blanket. The subtle herringbone pattern adds textural interest, while the lightweight nature of the wool makes it perfect for year-round use. Available in three natural colorways.",
    image: "https://images.unsplash.com/photo-1580999248150-e8e3c191de86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Home Decor",
    rating: 4.7,
    featured: true
  },
  {
    id: 6,
    name: "Marble Bookends",
    price: 79.99,
    shortDescription: "Sculptural elegance for your bookshelf",
    description: "These solid marble bookends combine functionality with sculptural beauty. Each set is cut from a single block of marble, ensuring the veining pattern flows seamlessly between the two pieces. The substantial weight keeps your books perfectly aligned.",
    image: "https://images.unsplash.com/photo-1589136777351-efb4fba16e17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Home Decor",
    rating: 4.4
  },
  {
    id: 7,
    name: "Linen Pajama Set",
    price: 99.99,
    shortDescription: "Breathable luxury for restful nights",
    description: "Experience the ultimate sleep comfort with this 100% linen pajama set. The breathable fabric regulates temperature while the relaxed fit ensures unrestricted movement. Pre-washed for immediate softness, this set becomes even more comfortable with each wash.",
    image: "https://images.unsplash.com/photo-1566095212436-41a1d96f2442?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Apparel",
    rating: 4.8
  },
  {
    id: 8,
    name: "Wireless Earbuds",
    price: 129.99,
    shortDescription: "Immersive sound in a minimal package",
    description: "These premium wireless earbuds deliver exceptional sound quality in a compact, ergonomic design. The active noise cancellation creates an immersive listening experience, while the long battery life ensures your music plays all day. The charging case adds 20 additional hours of playback.",
    image: "https://images.unsplash.com/photo-1590658268037-372a82cebf3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.6,
    featured: true
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
  );
};
