import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost/backend_php/api/user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          username,
          password
        })
      });

      const data = await res.json();
      if (data.success && data.user) {
        // ✅ 儲存完整 user（含 id, email, name）
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setMessage('登入成功！');
        navigate('/');
      } else {
        setMessage('登入失敗，請檢查帳密。');
      }
    } catch (error) {
      console.error('錯誤:', error);
      setMessage('伺服器錯誤，請稍後再試。');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>登入</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email：</label><br />
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />
        </div>
        <div>
          <label>密碼：</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        <button type="submit" style={{ marginTop: 10 }}>登入</button>
      </form>
      {message && <p style={{ color: message.includes('成功') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};

export default Login;
