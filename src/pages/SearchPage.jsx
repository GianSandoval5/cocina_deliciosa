import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../shared/components';
import RecipeGrid from '../features/recipes/components/RecipeGrid';
import { useRecipes } from '../features/recipes/hooks/useRecipes';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { recipes, loading, error, searchRecipes } = useRecipes();
  const [hasSearched, setHasSearched] = useState(false);
  
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      setHasSearched(true);
      searchRecipes(query);
    }
  }, [query, searchRecipes]);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    } else {
      setSearchParams({});
      setHasSearched(false);
    }
  };

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`, {
      state: { from: `/search?q=${encodeURIComponent(query)}` }
    });
  };

  const getSearchMessage = () => {
    if (!hasSearched) {
      return 'Comienza tu búsqueda escribiendo el nombre de una receta';
    }
    if (loading) {
      return 'Buscando recetas...';
    }
    if (error) {
      return `Error: ${error}`;
    }
    if (recipes.length === 0) {
      return `No se encontraron recetas para "${query}"`;
    }
    return `${recipes.length} receta${recipes.length === 1 ? '' : 's'} encontrada${recipes.length === 1 ? '' : 's'} para "${query}"`;
  };

  return (
    <div className="search-page">
      <div className="search-page__container">
        {/* Header */}
        <div className="search-page__header">
          <h1 className="search-page__title">Buscar Recetas</h1>
          <p className="search-page__description">
            Encuentra tu próxima receta favorita
          </p>
          
          <div className="search-page__search">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Buscar recetas por nombre..."
              autoFocus={!query}
            />
          </div>
        </div>

        {/* Results */}
        <div className="search-page__results">
          <div className="search-page__results-header">
            <h2 className="search-page__results-title">
              {getSearchMessage()}
            </h2>
          </div>

          {hasSearched && (
            <RecipeGrid
              recipes={recipes}
              loading={loading}
              onRecipeClick={handleRecipeClick}
              emptyMessage={`No se encontraron recetas para "${query}". Intenta con otros términos.`}
            />
          )}

          {!hasSearched && !loading && (
            <div className="search-page__suggestions">
              <h3 className="search-page__suggestions-title">
                Sugerencias de búsqueda
              </h3>
              <div className="search-page__suggestions-grid">
                {[
                  { term: 'Chicken', emoji: '🐔', description: 'Recetas con pollo' },
                  { term: 'Pasta', emoji: '🍝', description: 'Platos de pasta' },
                  { term: 'Salmon', emoji: '🐟', description: 'Platos con salmón' },
                  { term: 'Chocolate', emoji: '🍫', description: 'Postres de chocolate' },
                  { term: 'Rice', emoji: '🍚', description: 'Platos con arroz' },
                  { term: 'Soup', emoji: '🍲', description: 'Sopas y caldos' },
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    className="search-page__suggestion"
                    onClick={() => handleSearch(suggestion.term)}
                  >
                    <span className="search-page__suggestion-emoji">
                      {suggestion.emoji}
                    </span>
                    <span className="search-page__suggestion-term">
                      {suggestion.term}
                    </span>
                    <span className="search-page__suggestion-description">
                      {suggestion.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;