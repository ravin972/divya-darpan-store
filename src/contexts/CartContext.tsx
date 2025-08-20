import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: 'Parivartan' | 'Anandam' | 'Priest Booking';
  stock: number;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product; quantity?: number }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; items: CartItem[] };

const CartContext = createContext<{
  state: CartState;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.product.id === action.product.id);
      const quantity = action.quantity || 1;
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return calculateTotals(updatedItems);
      } else {
        const newItems = [...state.items, { product: action.product, quantity }];
        return calculateTotals(newItems);
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.product.id !== action.productId);
      return calculateTotals(newItems);
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        const newItems = state.items.filter(item => item.product.id !== action.productId);
        return calculateTotals(newItems);
      }
      
      const updatedItems = state.items.map(item =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
      return calculateTotals(updatedItems);
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };

    case 'SET_CART': {
      return calculateTotals(action.items);
    }
    
    default:
      return state;
  }
};

const calculateTotals = (items: CartItem[]): CartState => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { items, total, itemCount };
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, itemCount: 0 });
  const { session } = useAuth();

  // Build auth headers from Supabase session token (if available)
  const getAuthHeaders = () => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const token = session?.access_token;
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  };

  // Load cart from backend if authenticated; otherwise from localStorage
  useEffect(() => {
    const loadCart = async () => {
      try {
        if (session?.access_token) {
          const res = await fetch('/api/cart', { headers: getAuthHeaders() });
          if (res.ok) {
            const data = await res.json();
            // Map API items to CartItem[] shape
            const items: CartItem[] = (data.items || []).map((row: any) => ({
              product: {
                id: row.product_id,
                name: row.name,
                price: row.price,
                image: row.image,
                category: row.category,
                brand: row.brand,
                // Stock isn't returned by API; provide a safe default for UI
                stock: 999,
                description: ''
              },
              quantity: row.quantity || 1
            }));
            dispatch({ type: 'SET_CART', items });
            return;
          }
        }
      } catch (e) {
        // ignore and fall back to local storage
      }

      try {
        const raw = localStorage.getItem('cart');
        if (raw) {
          const items = JSON.parse(raw) as CartItem[];
          dispatch({ type: 'SET_CART', items });
        }
      } catch {}
    };

    loadCart();
  }, [session?.access_token]);

  // Persist to localStorage as a fallback layer
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  const addToCart = (product: Product, quantity = 1) => {
    // Optimistic update
    dispatch({ type: 'ADD_TO_CART', product, quantity });

    // Attempt to sync with backend (non-blocking)
    (async () => {
      try {
        await fetch('/api/cart', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ productId: product.id, quantity })
        });
      } catch {
        // ignore errors; local state remains the source of truth
      }
    })();
  };

  const removeFromCart = (productId: string) => {
    // Optimistic update
    dispatch({ type: 'REMOVE_FROM_CART', productId });

    (async () => {
      try {
        await fetch(`/api/cart/${productId}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
      } catch {}
    })();
  };

  const updateQuantity = (productId: string, quantity: number) => {
    // Optimistic update
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });

    (async () => {
      try {
        await fetch(`/api/cart/${productId}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ quantity })
        });
      } catch {}
    })();
  };

  const clearCart = () => {
    // Optimistic update
    dispatch({ type: 'CLEAR_CART' });

    (async () => {
      try {
        await fetch('/api/cart', {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
      } catch {}
    })();
  };

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};