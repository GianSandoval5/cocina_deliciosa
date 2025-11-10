import { useState, useEffect, useCallback } from 'react';
import { recipesService } from '../services/recipesService';

export const useRecipesByCategory = (category) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = useCallback(async () => {
    if (!category) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await recipesService.getRecipesByCategory(category);
      setRecipes(data);
    } catch (err) {
      console.error('Error fetching recipes by category:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return {
    recipes,
    loading,
    error,
    refetch: fetchRecipes,
  };
};

export default useRecipesByCategory;