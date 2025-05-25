import React, { useContext } from 'react';
import { CartContext } from '../CartContext';

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const handleQtyChange = (index, type) => {
    setCart(prev =>
      prev.map((item, i) => {
        if (i === index) {
          const newQty = type === 'inc' ? item.qty + 1 : item.qty - 1;
          return { ...item, qty: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const handleRemove = (indexToRemove) => {
    setCart(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('購物車是空的，無法結帳。');
      return;
    }

    const total = cart.reduce((sum, book) => sum + book.price * book.qty, 0);
    const order = {
      time: new Date().toLocaleString(),
      items: cart,
      total: total,
    };
    const prevOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...prevOrders, order]));
    setCart([]);
    alert(`✅ 結帳成功！總金額 $${total}`);
  };

  const total = cart.reduce((sum, book) => sum + book.price * book.qty, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛒 購物車</h2>
      {cart.length === 0 ? (
        <p>目前購物車是空的。</p>
      ) : (
        <>
          {cart.map((book, index) => (
            <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
              <h4>{book.title}</h4>
              <p>
                價格：${book.price} × {book.qty}
                <button onClick={() => handleQtyChange(index, 'inc')}>＋</button>
                <button onClick={() => handleQtyChange(index, 'dec')}>−</button>
              </p>
              <button onClick={() => handleRemove(index)}>移除</button>
            </div>
          ))}
          <h3>總金額：${total}</h3>
          <button onClick={handleCheckout}>🧾 結帳</button>
        </>
      )}
    </div>
  );
};

export default Cart;
