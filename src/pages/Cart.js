import React, { useContext } from 'react';
import { CartContext } from '../CartContext';

const Cart = () => {
  const { cartItems, setCartItems, clearCart } = useContext(CartContext);

  const handleQtyChange = (index, type) => {
    setCartItems(prev =>
      prev.map((item, i) => {
        if (i === index) {
          const newQty = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const handleRemove = (indexToRemove) => {
    setCartItems(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('購物車是空的，無法結帳。');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      alert('請先登入再結帳');
      return;
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      const res = await fetch('http://localhost/backend_php/api/order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          items: cartItems,
          total: totalAmount
        })
      });

      const result = await res.json();
      if (result.success) {
        alert('✅ 訂單已送出！訂單編號：' + result.order_id);
        clearCart();
      } else {
        alert('❌ 訂單送出失敗：' + result.message);
      }
    } catch (error) {
      console.error('結帳失敗', error);
      alert('❌ 系統錯誤，請稍後再試。');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛒 購物車</h2>
      {cartItems.length === 0 ? (
        <p>目前購物車是空的。</p>
      ) : (
        <>
          {cartItems.map((book, index) => (
            <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px 0', display: 'flex' }}>
              {/* ✅ 書封圖片 */}
              {book.image && (
                <img
                  src={book.image}
                  alt={book.title}
                  style={{ width: '80px', height: 'auto', marginRight: '16px', objectFit: 'cover' }}
                />
              )}
              <div>
                <h4>{book.title}</h4>
                <p>
                  價格：${book.price} × {book.quantity}
                  <button onClick={() => handleQtyChange(index, 'inc')} style={{ marginLeft: 8 }}>＋</button>
                  <button onClick={() => handleQtyChange(index, 'dec')} style={{ marginLeft: 4 }}>−</button>
                </p>
                <button onClick={() => handleRemove(index)}>移除</button>
              </div>
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
