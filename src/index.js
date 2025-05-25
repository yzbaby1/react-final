import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartContext } from './CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

// 包住整個 App，讓所有 component 都拿得到 context
const RootWithContext = () => {
  const [cart, setCart] = useState([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <App />
    </CartContext.Provider>
  );
};

root.render(
  <React.StrictMode>
    <RootWithContext />
  </React.StrictMode>
);
