import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    fetch('http://localhost/backend_php/api/order.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrders(data.orders);
        }
      })
      .catch(err => console.error('錯誤：', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📦 訂單紀錄</h2>
      {orders.length === 0 ? (
        <p>尚無任何訂單。</p>
      ) : (
        orders.map((order) => (
          <div key={order.order_id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
            <p>🆔 訂單編號：{order.order_id}</p>
            <p>🕒 建立時間：{order.created_at}</p>
            <p>📚 書名：</p>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {order.items.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '80px', height: 'auto', marginRight: '10px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <span>{item.title} × {item.quantity}（單價：${item.price}）</span>
                </li>
              ))}
            </ul>
            <strong>總金額：${order.total_amount}</strong>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
