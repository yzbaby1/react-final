import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!id || !name) {
      alert('請輸入完整資訊');
      return;
    }
    setUser({ id, name });
    navigate('/books'); 
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>會員登入</h2>
      <input
        type="text"
        placeholder="請輸入學號"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="請輸入姓名"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>登入</button>
    </div>
  );
};

export default Login;
