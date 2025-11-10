import { useState, useEffect, useCallback } from 'react';
import { recipesService } from '../services/recipesService';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomRecipes = useCallback(async (count = 6) => {
    setLoading(true);
    setError(null);

    try {
      const data = await recipesService.getRandomRecipes(count);
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPopularRecipes = useCallback(async (count = 6) => {
    setLoading(true);
    setError(null);

    try {
      const data = await recipesService.getPopularRecipes(count);
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFeaturedRecipes = useCallback(async (count = 6) => {
    setLoading(true);
    setError(null);

    try {
      const data = await recipesService.getFeaturedRecipes(count);
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); const fetchRecipesByCategory = useCallback(async (category) => {
    setLoading(true);
    setError(null);

    try {
      const data = await recipesService.getRecipesByCategory(category);
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchRecipes = useCallback(async (query) => {
    if (!query.trim()) {
      setRecipes([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await recipesService.searchRecipesByName(query);
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    recipes,
    loading,
    error,
    fetchRandomRecipes,
    fetchPopularRecipes,
    fetchFeaturedRecipes,
    fetchRecipesByCategory,
    searchRecipes,
  };
};

export const useRecipe = (id) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await recipesService.getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  return { recipe, loading, error };
};
