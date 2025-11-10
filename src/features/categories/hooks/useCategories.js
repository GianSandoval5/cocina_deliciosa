import { useState, useEffect, useCallback } from 'react';
import { categoriesService } from '../services/categoriesService';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await categoriesService.getAllCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPopularCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await categoriesService.getPopularCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPopularCategories();
  }, [fetchPopularCategories]);

  return {
    categories,
    loading,
    error,
    fetchAllCategories,
    fetchPopularCategories,
  };
};