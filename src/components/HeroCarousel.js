import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; 

const banners = [
  {
    title: '📚 二手書市集',
    subtitle: '找書、賣書，輕鬆又便利',
    image: '/images/banner1.png', 
  },
  {
    title: '🎯 精準搜尋分類',
    subtitle: '快速找到你想要的書',
    image: '/images/banner2.png',
  }
];

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = banners[index];

  return (
    <div className="hero-carousel">
      <img
        src={current.image}
        alt={current.title}
      />
      <div className="hero-overlay">
        <h1>{current.title}</h1>
        <p>{current.subtitle}</p>
        <Link to="/books">
          <button className="hero-button">立即逛書</button>
        </Link>
      </div>
    </div>
  );
};

export default HeroCarousel;
