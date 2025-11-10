import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../features/home/components/Hero';
import CategoryGrid from '../features/categories/components/CategoryGrid';
import RecipeGrid from '../features/recipes/components/RecipeGrid';
import { useCategories } from '../features/categories/hooks/useCategories';
import { useRecipes } from '../features/recipes/hooks/useRecipes';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading } = useCategories();
  const { recipes, loading: recipesLoading, error: recipesError, fetchPopularRecipes, fetchFeaturedRecipes } = useRecipes();

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        // Intentar cargar recetas populares primero
        await fetchPopularRecipes(6);
      } catch (error) {
        console.warn('Error loading popular recipes, trying featured recipes...', error);
        try {
          // Fallback a recetas destacadas
          await fetchFeaturedRecipes(6);
        } catch (fallbackError) {
          console.error('Failed to load any recipes:', fallbackError);
        }
      }
    };

    loadRecipes();
  }, [fetchPopularRecipes, fetchFeaturedRecipes]); const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category.name)}`);
  };

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`, {
      state: { from: '/' }
    });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero onSearch={handleSearch} />

      {/* Categories Section */}
      <section className="home-page__section">
        <div className="home-page__container">
          <div className="home-page__section-header">
            <h2 className="home-page__section-title">
              Explora por Categorías
            </h2>
            <p className="home-page__section-description">
              Descubre recetas organizadas por tipo de comida
            </p>
          </div>

          <CategoryGrid
            categories={categories}
            loading={categoriesLoading}
            onCategoryClick={handleCategoryClick}
          />
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section className="home-page__section home-page__section--alt">
        <div className="home-page__container">
          <div className="home-page__section-header">
            <h2 className="home-page__section-title">
              Recetas Populares
            </h2>
            <p className="home-page__section-description">
              Las recetas más destacadas de nuestra colección
            </p>
          </div>

          {recipesError && (
            <div className="home-page__error">
              <h3>😔 Error al cargar recetas</h3>
              <p>{recipesError}</p>
              <button
                onClick={() => fetchFeaturedRecipes(6)}
                className="home-page__retry-button"
              >
                Intentar de nuevo
              </button>
            </div>
          )}

          <RecipeGrid
            recipes={recipes}
            loading={recipesLoading}
            onRecipeClick={handleRecipeClick}
            emptyMessage="No se pudieron cargar las recetas populares"
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
