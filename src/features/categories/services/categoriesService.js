import { apiService } from '../../../shared/services/apiService.js';
import { API_CONFIG } from '../../../shared/constants/index.js';

export const categoriesService = {
  // Obtener todas las categorías
  async getAllCategories() {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.ALL_CATEGORIES);
      
      if (!response.categories) {
        return [];
      }
      
      return response.categories.map(category => ({
        id: category.idCategory,
        name: category.strCategory,
        description: category.strCategoryDescription,
        image: category.strCategoryThumb,
        slug: category.strCategory.toLowerCase().replace(/\s+/g, '-'),
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('No se pudieron cargar las categorías');
    }
  },

  // Obtener categorías populares (primeras 8)
  async getPopularCategories() {
    try {
      const allCategories = await this.getAllCategories();
      return allCategories.slice(0, 8);
    } catch (error) {
      console.error('Error fetching popular categories:', error);
      throw new Error('No se pudieron cargar las categorías populares');
    }
  },

  // Obtener áreas de cocina
  async getAllAreas() {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.ALL_AREAS);
      
      if (!response.meals) {
        return [];
      }
      
      return response.meals.map(area => ({
        name: area.strArea,
        slug: area.strArea.toLowerCase().replace(/\s+/g, '-'),
      }));
    } catch (error) {
      console.error('Error fetching areas:', error);
      throw new Error('No se pudieron cargar las áreas de cocina');
    }
  },

  // Obtener ingredientes principales
  async getAllIngredients() {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.ALL_INGREDIENTS);
      
      if (!response.meals) {
        return [];
      }
      
      return response.meals.slice(0, 50).map(ingredient => ({
        name: ingredient.strIngredient,
        description: ingredient.strDescription,
        slug: ingredient.strIngredient.toLowerCase().replace(/\s+/g, '-'),
      }));
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      throw new Error('No se pudieron cargar los ingredientes');
    }
  },
};

export default categoriesService;