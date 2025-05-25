// pages/AddBook.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBook = ({ setBooks }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newBook = {
      id: Date.now(),
      ...form,
      price: parseFloat(form.price)
    };
    setBooks(prev => [...prev, newBook]);
    navigate('/books');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>新增書籍</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="書名" required />
        <input name="author" value={form.author} onChange={handleChange} placeholder="作者" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="價格" required type="number" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="圖片網址" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="描述" required />
        
        {/* 分類下拉選單 */}
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">請選擇分類</option>
          <option value="程式">程式</option>
          <option value="設計">設計</option>
          <option value="語言">語言</option>
          <option value="小說">小說</option>
        </select>

        <button type="submit">新增</button>
      </form>
    </div>
  );
};

export default AddBook;
