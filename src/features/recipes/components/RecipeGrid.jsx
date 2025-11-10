import React from 'react';
import RecipeCard from './RecipeCard';
import { LoadingGrid } from '../../../shared/components';
import './RecipeGrid.css';

const RecipeGrid = ({ recipes, loading, onRecipeClick, emptyMessage = 'No se encontraron recetas' }) => {
  if (loading) {
    return <LoadingGrid count={6} />;
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="recipe-grid--empty">
        <div className="recipe-grid__empty-content">
          <div className="recipe-grid__empty-icon">🍽️</div>
          <h3 className="recipe-grid__empty-title">
            {emptyMessage}
          </h3>
          <p className="recipe-grid__empty-description">
            Intenta con otros términos de búsqueda o explora nuestras categorías
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={onRecipeClick}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;