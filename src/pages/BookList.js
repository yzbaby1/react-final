// pages/BookList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BookList = ({ books, setBooks }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('全部');

  const handleDelete = (idToDelete) => {
    if (window.confirm('確定要刪除這本書嗎？')) {
      setBooks(prev => prev.filter(book => book.id !== idToDelete));
    }
  };

  // 先依分類篩選
  let filteredBooks = books;
  if (category !== '全部') {
    filteredBooks = filteredBooks.filter(book => book.category === category);
  }

  // 再依搜尋字串進一步篩選
  filteredBooks = filteredBooks.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>書籍列表</h2>

      {/* 分類選單 */}
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
      </select>

      {/* 搜尋框 */}
      <input
        type="text"
        placeholder="搜尋書名或作者"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '8px', marginBottom: '20px', width: '100%' }}
      />

      {/* 書籍清單 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredBooks.map(book => (
          <div key={book.id} style={{ border: '1px solid #ddd', padding: '10px', width: '200px' }}>
            <img src={book.image} alt={book.title} style={{ width: '100%' }} />
            <h3>{book.title}</h3>
            <p>作者：{book.author}</p>
            <p>分類：{book.category}</p>
            <p>${book.price}</p>
            <Link to={`/books/${book.id}`}>查看詳情</Link>
            {book.id > 1000 && (
              <button onClick={() => handleDelete(book.id)} style={{ marginTop: '10px' }}>
                刪除
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
