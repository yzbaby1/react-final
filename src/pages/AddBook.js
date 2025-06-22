// pages/AddBook.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
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

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost/backend_php/api/book.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          seller_id: 1,          // 可改成從 localStorage 拿使用者 ID
          status: 'available'
        })
      });

      const result = await res.json();
      if (result.success) {
        alert('新增成功');
        navigate('/books');
      } else {
        alert('新增失敗');
        console.error(result);
      }
    } catch (err) {
      console.error('新增錯誤:', err);
      alert('伺服器錯誤');
    }
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
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">請選擇分類</option>
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
        <button type="submit">新增</button>
      </form>
    </div>
  );
};

export default AddBook;
