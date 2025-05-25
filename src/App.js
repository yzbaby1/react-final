import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import './AppStyles.css';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import AddBook from './pages/AddBook';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Orders from './pages/Orders';

import { books as initialBooks } from './data';

function App() {
  const [books, setBooks] = useState(initialBooks);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); 

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList books={books} setBooks={setBooks} />} />
        <Route path="/books/:id" element={<BookDetail books={books} setCart={setCart} />} />
        <Route path="/add" element={<AddBook setBooks={setBooks} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
