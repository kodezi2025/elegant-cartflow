
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WishlistContextType, Product } from './types';
import { toast } from "sonner";

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      const isProductInWishlist = prevWishlist.some(item => item.id === product.id);
      
      if (isProductInWishlist) {
        toast.info(`${product.name} is already in your wishlist`);
        return prevWishlist;
      } else {
        toast.success(`Added ${product.name} to wishlist`);
        return [...prevWishlist, product];
      }
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(prevWishlist => {
      const productToRemove = prevWishlist.find(item => item.id === productId);
      if (productToRemove) {
        toast.info(`Removed ${productToRemove.name} from wishlist`);
      }
      return prevWishlist.filter(item => item.id !== productId);
    });
  };

  const isInWishlist = (productId: number): boolean => {
    return wishlist.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.info("Wishlist cleared");
  };

  const getWishlistCount = (): number => {
    return wishlist.length;
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlist, 
        addToWishlist, 
        removeFromWishlist, 
        isInWishlist,
        clearWishlist,
        getWishlistCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
