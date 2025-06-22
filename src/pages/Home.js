import React, { useEffect, useState } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import AnnouncementBar from '../components/AnnouncementBar';
import BookSection from '../components/BookSection';
import CategorySidebar from '../components/CategorySidebar';
import Footer from '../components/Footer';
import '../styles/HomePage.css';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost/backend_php/api/book.php')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('載入書籍失敗', err));
  }, []);

  const latest = books.slice(0, 6);

  return (
    <div>
      <HeroCarousel />
      <AnnouncementBar />

      <div style={{ display: 'flex', alignItems: 'flex-start', padding: '30px 40px' }}>
        <CategorySidebar />
        <div style={{ flex: 1, paddingLeft: '30px' }}>
          <BookSection title="📕 最新上架" books={latest} />
          
          <section style={{ marginTop: '40px' }}>
            <h2 style={{ fontWeight: 'bold', marginBottom: '10px' }}>📖 關於我們</h2>
            <p style={{ lineHeight: '1.8', color: '#444' }}>
              「二手書市集」是一個讓舊書重獲新生的平台，我們相信每一本書都值得再次被閱讀。
              無論你是學生、創作者或愛書人，都能在這裡找到專屬書單，讓書流動起來，也讓知識延續下去。
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
