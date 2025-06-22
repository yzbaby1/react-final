import React from 'react';
import BookCard from './BookCard';

const BookSection = ({ title, books }) => (
  <div style={{ padding: '2rem' }}>
    <h2>{title}</h2>
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center'
    }}>
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  </div>
);

export default BookSection;
