import React from 'react';
import CategoryCard from './CategoryCard';
import { LoadingGrid } from '../../../shared/components';
import './CategoryGrid.css';

const CategoryGrid = ({ categories, loading, onCategoryClick }) => {
  if (loading) {
    return <LoadingGrid count={8} />;
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="category-grid--empty">
        <div className="category-grid__empty-content">
          <div className="category-grid__empty-icon">🏷️</div>
          <h3 className="category-grid__empty-title">
            No hay categorías disponibles
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="category-grid">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onClick={onCategoryClick}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;