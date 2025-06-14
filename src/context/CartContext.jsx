// import { createContext, useContext, useState } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product, quantity = 1) => {
//     setCartItems(prev => {
//       console.log("Previous Cart: ", prev)
//       if (!product || !product._id) {
//         console.warn("Invalid product passed to addToCart:", product);
//         return prev;
//       }

//       const existing = prev.find(item => item.product._id === product._id);
//       if (existing) {
//         return prev.map(item =>
//           item.product._id === product._id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       } else {
//         return [...prev, { product, quantity }];
//       }
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCartItems(prev => prev.filter(item => item.product._id !== productId));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

// LOCAL STORAGE

import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      if (!product || !product._id) return prev;
      console.log("Previous Cart: ", prev)
      const existing = prev.find(item => item.product._id === product._id);
      return existing
        ? prev.map(item =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product._id !== productId));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

