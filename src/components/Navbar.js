import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', background: '#f0f0f0' }}>
      <Link to="/">Home</Link> |{' '}
      <Link to="/books">Books</Link> |{' '}
      <Link to="/add">Add Book</Link> |{' '}
      <Link to="/cart">Cart</Link> |{' '}
      <Link to="/orders">Orders</Link> |
      {user ? (
        <>
          <span style={{ marginLeft: '10px' }}>Hi, {user.name}</span>
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>登出</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
