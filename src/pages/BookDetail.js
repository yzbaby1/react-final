// pages/BookDetail.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../CartContext';
 // 根據你的實際路徑調整

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { addToCart } = useContext(CartContext); // 加入購物車 function

  useEffect(() => {
    fetch(`http://localhost/backend_php/api/book.php?id=${id}`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => console.error('載入書籍資料失敗', err));
  }, [id]);

  if (!book) {
    return <div>載入中...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>{book.title}</h2>
      <img src={book.image} alt={book.title} style={{ width: '300px' }} />
      <p>作者：{book.author}</p>
      <p>分類：{book.category}</p>
      <p>價格：${book.price}</p>
      <p>描述：{book.description}</p>
      <button onClick={() => addToCart(book)} style={{ marginTop: '20px' }}>
        加入購物車
      </button>
    </div>
  );
};

export default BookDetail;
