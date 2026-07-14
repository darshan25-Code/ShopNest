import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");

  return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  // Debug: Log cart whenever it changes
  useEffect(() => {
    console.log("Current Cart:", cart);
  }, [cart]);

  const addToCart = (product) => {
    console.log("addToCart called");

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseQuantity = (id) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter((item) => item.quantity > 0)
  );
};

const removeFromCart = (id) => {
  setCart((prevCart) =>
    prevCart.filter((item) => item._id !== id)
  );
};

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
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