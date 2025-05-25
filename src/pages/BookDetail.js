import { useContext } from 'react';
import { CartContext } from '../CartContext';
import { useParams } from 'react-router-dom';


const BookDetail = ({ books }) => {
  const { cart, setCart } = useContext(CartContext);
  const { id } = useParams();
  const book = books.find(b => b.id === parseInt(id));

  const handleAddToCart = () => {
    const exist = cart.find(item => item.id === book.id);
    if (exist) {
      setCart(prev =>
        prev.map(item =>
          item.id === book.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart(prev => [...prev, { ...book, qty: 1 }]);
    }
    alert('已加入購物車！');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{book.title}</h2>
      <p>作者：{book.author}</p>
      <p>價格：${book.price}</p>
      <button onClick={handleAddToCart}>加入購物車</button>
    </div>
  );
};
export default BookDetail;
