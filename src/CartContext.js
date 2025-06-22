import React, { createContext, useState, useEffect } from 'react';

// 建立購物車 Context
export const CartContext = createContext();

// 提供 Context 包裝元件
export const CartProvider = ({ children }) => {
  // 初始化購物車（從 localStorage）
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // 每次更新購物車，自動同步到 localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 加入商品到購物車
  const addToCart = (book) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === book.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...book, quantity: 1 }];
      }
    });
  };

  // 從購物車中移除商品
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 清空購物車
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,      // ✅ 加入 setCartItems 供數量調整使用
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
