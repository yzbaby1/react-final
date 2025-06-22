import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => (
  <div style={{
    width: '180px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center'
  }}>
    <img src={book.image} alt={book.title} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
    <h4 style={{ margin: '10px 0 5px' }}>{book.title}</h4>
    <p style={{ fontSize: '0.9rem', color: '#666' }}>{book.author}</p>
    <p style={{ fontWeight: 'bold' }}>${book.price}</p>
    <Link to={`/books/${book.id}`}>
    <button style={{
  marginTop: '10px',
  padding: '6px 12px',
  fontSize: '0.9rem',
  backgroundColor: '#8B5E3C', 
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold'
}}>
  查看
</button>

    </Link>
  </div>
);

export default BookCard;