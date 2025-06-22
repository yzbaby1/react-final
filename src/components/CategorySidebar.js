import React from 'react';
import './CategorySidebar.css'; // 記得自訂樣式

const categories = [
  '華文文學', '世界文學', '類型文學', '歷史地理', '哲學宗教', '社會科學', '藝術',
  '建築設計', '商業', '語言', '電腦', '生活風格', '醫學保健', '旅遊',
  '漫畫／輕小說', '政府與用', '少兒親子', '教育', '科學', '心理勵志', '其他'
];

const CategorySidebar = () => {
  return (
    <div className="sidebar">
      <h3>二手中文書</h3>
      <ul className="category-list">
        {categories.map((cat, idx) => (
          <li key={idx}>{cat}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
