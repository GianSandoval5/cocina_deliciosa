import React, { useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../shared/components';
import RecipeGrid from '../features/recipes/components/RecipeGrid';
import { useRecipesByCategory } from '../features/recipes/hooks/useRecipesByCategory';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // Memoizar el nombre de la categoría decodificado
  const categoryName = useMemo(() => {
    return category ? decodeURIComponent(category) : '';
  }, [category]);

  const { recipes, loading, error, refetch } = useRecipesByCategory(categoryName);

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleRecipeClick = useCallback((recipe) => {
    navigate(`/recipe/${recipe.id}`, {
      state: { from: `/category/${category}` }
    });
  }, [navigate, category]);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="category-page">
      <div className="category-page__container">
        {/* Header */}
        <div className="category-page__header">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="category-page__back-button"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Button>
          
          <div className="category-page__title-section">
            <h1 className="category-page__title">
              Recetas de {categoryName}
            </h1>
            <p className="category-page__description">
              Descubre todas las deliciosas recetas de la categoría {categoryName.toLowerCase()}
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="category-page__content">
          {error && (
            <div className="category-page__error">
              <h3>😔 Error al cargar recetas</h3>
              <p>{error}</p>
              <Button onClick={handleRetry}>
                Intentar de nuevo
              </Button>
            </div>
          )}

          <RecipeGrid
            recipes={recipes}
            loading={loading}
            onRecipeClick={handleRecipeClick}
            emptyMessage={`No se encontraron recetas en la categoría "${categoryName}"`}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;