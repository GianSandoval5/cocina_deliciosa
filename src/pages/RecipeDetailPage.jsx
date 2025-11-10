import React, { useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Star, ChefHat, ExternalLink, Play } from 'lucide-react';
import { useRecipe } from '../features/recipes/hooks/useRecipes';
import { LoadingSpinner, Button } from '../shared/components';
import './RecipeDetailPage.css';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { recipe, loading, error } = useRecipe(id);

  const handleBack = useCallback(() => {
    // Verificar si hay un state con la ruta de origen
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      // Fallback seguro a la página principal
      navigate('/');
    }
  }, [navigate, location.state]);

  const getDifficultyColor = useCallback((difficulty) => {
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
  }, []);

  if (loading) {
    return (
      <div className="recipe-detail--loading">
        <LoadingSpinner size="lg" />
        <p>Cargando receta...</p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="recipe-detail--error">
        <div className="recipe-detail__error-content">
          <h2>😔 Receta no encontrada</h2>
          <p>{error || 'La receta que buscas no está disponible.'}</p>
          <Button onClick={handleBack}>
            <ArrowLeft size={16} />
            Volver
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-detail">
      {/* Header */}
      <div className="recipe-detail__header">
        <div className="recipe-detail__container">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="recipe-detail__back-button"
          >
            <ArrowLeft size={16} />
            Volver
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="recipe-detail__hero">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="recipe-detail__hero-image"
        />
        <div className="recipe-detail__hero-overlay">
          <div className="recipe-detail__container">
            <div className="recipe-detail__hero-content">
              <div className="recipe-detail__category">
                {recipe.category}
              </div>
              <h1 className="recipe-detail__title">{recipe.name}</h1>
              <div className="recipe-detail__meta">
                <div className="recipe-detail__meta-item">
                  <Clock size={16} />
                  <span>{recipe.estimatedTime}</span>
                </div>
                <div className="recipe-detail__meta-item">
                  <ChefHat size={16} />
                  <span 
                    style={{ color: getDifficultyColor(recipe.difficulty) }}
                  >
                    {recipe.difficulty}
                  </span>
                </div>
                <div className="recipe-detail__meta-item">
                  <Star size={16} fill="currentColor" />
                  <span>{recipe.rating}</span>
                </div>
                {recipe.area && (
                  <div className="recipe-detail__meta-item">
                    📍 {recipe.area}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="recipe-detail__content">
        <div className="recipe-detail__container">
          <div className="recipe-detail__grid">
            {/* Ingredients */}
            <div className="recipe-detail__section">
              <h2 className="recipe-detail__section-title">
                🥬 Ingredientes
              </h2>
              <div className="recipe-detail__ingredients">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="recipe-detail__ingredient">
                    <span className="recipe-detail__ingredient-name">
                      {ingredient.name}
                    </span>
                    {ingredient.measure && (
                      <span className="recipe-detail__ingredient-measure">
                        {ingredient.measure}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="recipe-detail__section">
              <h2 className="recipe-detail__section-title">
                👩‍🍳 Instrucciones
              </h2>
              <div className="recipe-detail__instructions">
                {recipe.instructions.map((instruction) => (
                  <div key={instruction.step} className="recipe-detail__instruction">
                    <div className="recipe-detail__step-number">
                      {instruction.step}
                    </div>
                    <div className="recipe-detail__step-content">
                      {instruction.instruction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Links */}
          {(recipe.youtube || recipe.source) && (
            <div className="recipe-detail__links">
              <h3 className="recipe-detail__links-title">Enlaces relacionados</h3>
              <div className="recipe-detail__links-grid">
                {recipe.youtube && (
                  <a
                    href={recipe.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="recipe-detail__link"
                  >
                    <Play size={20} />
                    <span>Ver en YouTube</span>
                    <ExternalLink size={16} />
                  </a>
                )}
                {recipe.source && (
                  <a
                    href={recipe.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="recipe-detail__link"
                  >
                    <ExternalLink size={20} />
                    <span>Fuente original</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="recipe-detail__tags-section">
              <h3 className="recipe-detail__tags-title">Etiquetas</h3>
              <div className="recipe-detail__tags">
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="recipe-detail__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;