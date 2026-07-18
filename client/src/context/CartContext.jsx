import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  const getUserCart = () => {
    if (!user) return [];

    const savedCart = localStorage.getItem(`cart_${user._id}`);
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const [cart, setCart] = useState(getUserCart);

  // Reload cart whenever user changes
  useEffect(() => {
    setCart(getUserCart());
  }, [user]);

  // Save cart for current user
  useEffect(() => {
    if (!user) return;

    localStorage.setItem(
      `cart_${user._id}`,
      JSON.stringify(cart)
    );
  }, [cart, user]);

const addToCart = (product) => {
  const existing = cart.find((item) => item._id === product._id);

  if (existing) {
    setCart(
      cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    toast.success("Quantity Updated 🛒");
  } else {
    setCart([...cart, { ...product, quantity: 1 }]);

    toast.success("Product Added to Cart 🛒");
  }
};
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item._id !== id)
    );
  };

  const clearCart = () => {
  if (user) {
    localStorage.removeItem(`cart_${user._id}`);
  }

  setCart([]);
};

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export default CartContext;