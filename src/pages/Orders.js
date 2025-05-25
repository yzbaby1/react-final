import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📦 訂單紀錄</h2>
      {orders.length === 0 ? (
        <p>尚無任何訂單。</p>
      ) : (
        orders.map((order, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
            <h4>🕒 時間：{order.time}</h4>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>{item.title} × {item.qty}（${item.price}）</li>
              ))}
            </ul>
            <strong>總金額：${order.total}</strong>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
