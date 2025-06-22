import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import AddBook from './pages/AddBook';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Orders from './pages/Orders';

import './AppStyles.css';
import { books as initialBooks } from './data';

import { CartProvider } from './CartContext';

function App() {
  const [books, setBooks] = useState(initialBooks);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <CartProvider>
      <Router>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList books={books} setBooks={setBooks} />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/add"
            element={
              <ProtectedRoute user={user}>
                <AddBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute user={user}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute user={user}>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
