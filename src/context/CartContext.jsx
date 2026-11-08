import { createContext, useState, useContext } from "react";

// 1. Create the context
export const CartContext = createContext();

// 2. Custom hook for easy consumption
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// 3. Provider component that wraps the app
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState("store"); // "store" | "cart" | "payment"

  const addToCart = (shoe) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === shoe.id);
      if (existing) {
        return prev.map((item) =>
          item.id === shoe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...shoe, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
