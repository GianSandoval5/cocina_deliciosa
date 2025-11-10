import React from 'react';
import { Clock, Users, Star, ChefHat } from 'lucide-react';
import { Card } from '../../../shared/components';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(recipe);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Fácil':
        return '#22c55e';
      case 'Intermedio':
        return '#f59e0b';
      case 'Difícil':
        return '#ef4444';
      default:
        return '#78716c';
    }
  };

  return (
    <Card hover className="recipe-card" onClick={handleClick} padding="none">
      <div className="recipe-card__image-container">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="recipe-card__image"
          loading="lazy"
        />
        <div className="recipe-card__overlay">
          <div className="recipe-card__category">
            {recipe.category}
          </div>
          <div className="recipe-card__rating">
            <Star size={14} fill="currentColor" />
            <span>{recipe.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="recipe-card__content">
        <h3 className="recipe-card__title">{recipe.name}</h3>
        
        <div className="recipe-card__meta">
          <div className="recipe-card__meta-item">
            <Clock size={16} />
            <span>{recipe.estimatedTime}</span>
          </div>
          
          <div className="recipe-card__meta-item">
            <ChefHat size={16} />
            <span 
              className="recipe-card__difficulty"
              style={{ color: getDifficultyColor(recipe.difficulty) }}
            >
              {recipe.difficulty}
            </span>
          </div>
        </div>
        
        {recipe.area && (
          <div className="recipe-card__area">
            📍 {recipe.area}
          </div>
        )}
        
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="recipe-card__tags">
            {recipe.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="recipe-card__tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecipeCard;