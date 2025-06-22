// pages/BookList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('全部');

  // 初始載入書籍資料
  useEffect(() => {
    fetch('http://localhost/backend_php/api/book.php')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('載入書籍失敗', err));
  }, []);

  // 處理刪除書籍
  const handleDelete = async (idToDelete) => {
    if (window.confirm('確定要刪除這本書嗎？')) {
      try {
        await fetch(`http://localhost/backend_php/api/book.php?id=${idToDelete}`, {
          method: 'DELETE'
        });
        setBooks(prev => prev.filter(book => book.id !== idToDelete));
      } catch (err) {
        console.error('刪除失敗', err);
      }
    }
  };

  // 分類與搜尋篩選
  let filteredBooks = books;
  if (category !== '全部') {
    filteredBooks = filteredBooks.filter(book => book.category === category);
  }

  filteredBooks = filteredBooks.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>書籍列表</h2>

      {/* 分類下拉選單 */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginBottom: '10px', padding: '6px' }}
      >
        <option value="全部">全部分類</option>
        <option value="程式">程式</option>
        <option value="設計">設計</option>
        <option value="語言">語言</option>
        <option value="小說">小說</option>
        <option value="華文文學">華文文學</option>
          <option value="世界文學">世界文學</option>
          <option value="類型文學">類型文學（推理／奇幻）</option>
          <option value="歷史地理">歷史地理</option>
          <option value="哲學宗教">哲學宗教</option>
          <option value="社會科學">社會科學</option>
          <option value="政治法律">政治法律</option>
          <option value="經濟金融">經濟金融</option>
          <option value="商業理財">商業理財</option>
          <option value="語言學習">語言學習</option>
          <option value="電腦資訊">電腦資訊／程式設計</option>
          <option value="自然科學">自然科學</option>
          <option value="醫學保健">醫學保健</option>
          <option value="心理勵志">心理勵志</option>
          <option value="教育學習">教育學習</option>
          <option value="藝術設計">藝術設計</option>
          <option value="建築空間">建築空間</option>
          <option value="旅遊休閒">旅遊休閒</option>
          <option value="生活風格">生活風格（料理／手作）</option>
          <option value="漫畫小說">漫畫／輕小說</option>
      </select>

      {/* 搜尋輸入框 */}
      <input
        type="text"
        placeholder="搜尋書名或作者"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '8px', marginBottom: '20px', width: '100%' }}
      />

      {/* 書籍列表 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredBooks.map(book => (
          <div key={book.id} style={{ border: '1px solid #ddd', padding: '10px', width: '200px' }}>
            <img src={book.image} alt={book.title} style={{ width: '100%' }} />
            <h3>{book.title}</h3>
            <p>作者：{book.author}</p>
            <p>分類：{book.category}</p>
            <p>${book.price}</p>
            <Link to={`/books/${book.id}`}>查看詳情</Link>
            <button onClick={() => handleDelete(book.id)} style={{ marginTop: '10px' }}>
              刪除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
