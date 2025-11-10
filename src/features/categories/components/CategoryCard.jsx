import React from 'react';
import { Card } from '../../../shared/components';
import './CategoryCard.css';

const CategoryCard = ({ category, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(category);
    }
  };

  return (
    <Card hover className="category-card" onClick={handleClick} padding="none">
      <div className="category-card__image-container">
        <img
          src={category.image}
          alt={category.name}
          className="category-card__image"
          loading="lazy"
        />
        <div className="category-card__overlay">
          <h3 className="category-card__title">{category.name}</h3>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;