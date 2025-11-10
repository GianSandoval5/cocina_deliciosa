// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://www.themealdb.com/api/json/v1/1',
  ENDPOINTS: {
    // Recetas
    RANDOM_MEAL: '/random.php',
    MEAL_BY_ID: '/lookup.php?i=',
    SEARCH_BY_NAME: '/search.php?s=',
    SEARCH_BY_FIRST_LETTER: '/search.php?f=',

    // Categorías
    ALL_CATEGORIES: '/categories.php',
    MEALS_BY_CATEGORY: '/filter.php?c=',

    // Áreas
    ALL_AREAS: '/list.php?a=list',
    MEALS_BY_AREA: '/filter.php?a=',

    // Ingredientes
    ALL_INGREDIENTS: '/list.php?i=list',
    MEALS_BY_INGREDIENT: '/filter.php?i=',
  }
};

// Application Routes
export const ROUTES = {
  HOME: '/',
  RECIPE_DETAIL: '/recipe/:id',
  CATEGORY: '/category/:category',
  SEARCH: '/search',
  FAVORITES: '/favorites',
};

// Application Constants
export const APP_CONFIG = {
  NAME: 'Cocina Deliciosa',
  DESCRIPTION: 'Descubre las mejores recetas del mundo',
  ITEMS_PER_PAGE: 12,
  SEARCH_DEBOUNCE_TIME: 300,
};

// Recipe difficulty levels
export const DIFFICULTY_LEVELS = {
  EASY: 'Fácil',
  MEDIUM: 'Intermedio',
  HARD: 'Difícil',
};

// Cooking time ranges
export const COOKING_TIME_RANGES = {
  QUICK: '< 30 min',
  MEDIUM: '30-60 min',
  LONG: '> 60 min',
};

export default {
  API_CONFIG,
  ROUTES,
  APP_CONFIG,
  DIFFICULTY_LEVELS,
  COOKING_TIME_RANGES,
};
