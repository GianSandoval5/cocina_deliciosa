import { apiService } from '../../../shared/services/apiService.js';
import { API_CONFIG } from '../../../shared/constants/index.js';

export const recipesService = {
  // Obtener recetas populares (usando categorías populares en lugar de aleatorias)
  async getPopularRecipes(count = 6) {
    try {
      // Categorías más populares para obtener recetas variadas
      const popularCategories = ['Chicken', 'Beef', 'Pasta', 'Seafood', 'Vegetarian', 'Dessert', 'Side', 'Starter'];
      const recipes = [];

      // Mezclar las categorías para mayor variedad
      const shuffledCategories = popularCategories.sort(() => Math.random() - 0.5);

      // Obtener 1 receta de cada categoría hasta llegar al count deseado
      for (const category of shuffledCategories) {
        if (recipes.length >= count) break;

        try {
          const response = await apiService.get(`${API_CONFIG.ENDPOINTS.MEALS_BY_CATEGORY}${category}`);
          if (response.meals && response.meals.length > 0) {
            // Tomar una receta aleatoria de la categoría para más variedad
            const randomIndex = Math.floor(Math.random() * Math.min(response.meals.length, 5));
            const selectedMeal = response.meals[randomIndex];

            // Obtener detalles completos de la receta
            const fullRecipe = await this.getRecipeById(selectedMeal.idMeal);
            if (fullRecipe) {
              recipes.push(fullRecipe);
            }
          }
        } catch (categoryError) {
          console.warn(`Error fetching recipes from ${category}:`, categoryError);
          // Continuar con la siguiente categoría si una falla
        }

        // Pequeña pausa para evitar sobrecarga de la API
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Si no tenemos suficientes recetas, intentar con método de respaldo
      if (recipes.length < count) {
        console.log(`Solo se encontraron ${recipes.length} recetas, intentando método de respaldo...`);

        // Método de respaldo: usar búsquedas por letra
        const letters = ['a', 'b', 'c', 'd', 'e'];
        for (const letter of letters) {
          if (recipes.length >= count) break;

          try {
            const response = await apiService.get(`${API_CONFIG.ENDPOINTS.SEARCH_BY_FIRST_LETTER}${letter}`);
            if (response.meals && response.meals.length > 0) {
              const randomMeal = response.meals[Math.floor(Math.random() * response.meals.length)];
              const fullRecipe = await this.getRecipeById(randomMeal.idMeal);
              if (fullRecipe && !recipes.some(r => r.id === fullRecipe.id)) {
                recipes.push(fullRecipe);
              }
            }
          } catch (letterError) {
            console.warn(`Error fetching recipes starting with ${letter}:`, letterError);
          }
        }
      }

      return recipes.slice(0, count);
    } catch (error) {
      console.error('Error fetching popular recipes:', error);
      throw new Error('No se pudieron cargar las recetas populares');
    }
  },  // Mantener método aleatorio para compatibilidad, pero mejorado
  async getRandomRecipes(count = 6) {
    try {
      // Usar el nuevo método de recetas populares como fallback más confiable
      return await this.getPopularRecipes(count);
    } catch (error) {
      console.error('Error fetching random recipes:', error);
      throw new Error('No se pudieron cargar las recetas aleatorias');
    }
  },

  // Método de respaldo con recetas destacadas específicas
  async getFeaturedRecipes(count = 6) {
    try {
      // IDs de recetas conocidas que funcionan bien como contenido destacado
      const featuredIds = ['52874', '52772', '52773', '52775', '52776', '52777', '52778', '52779'];
      const shuffledIds = featuredIds.sort(() => Math.random() - 0.5);
      const selectedIds = shuffledIds.slice(0, count);

      const recipes = [];
      for (const id of selectedIds) {
        try {
          const recipe = await this.getRecipeById(id);
          if (recipe) {
            recipes.push(recipe);
          }
        } catch (idError) {
          console.warn(`Error fetching recipe ${id}:`, idError);
        }
      }

      return recipes;
    } catch (error) {
      console.error('Error fetching featured recipes:', error);
      throw new Error('No se pudieron cargar las recetas destacadas');
    }
  },

  // Obtener receta por ID
  async getRecipeById(id) {
    try {
      const response = await apiService.get(`${API_CONFIG.ENDPOINTS.MEAL_BY_ID}${id}`);

      if (!response.meals || response.meals.length === 0) {
        throw new Error('Receta no encontrada');
      }

      return this.transformRecipe(response.meals[0]);
    } catch (error) {
      console.error('Error fetching recipe by ID:', error);
      throw error;
    }
  },

  // Buscar recetas por nombre
  async searchRecipesByName(name) {
    try {
      if (!name || name.trim().length === 0) {
        return [];
      }

      const response = await apiService.get(`${API_CONFIG.ENDPOINTS.SEARCH_BY_NAME}${encodeURIComponent(name.trim())}`);

      if (!response.meals) {
        return [];
      }

      return response.meals.map(meal => this.transformRecipe(meal));
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw new Error('Error al buscar recetas');
    }
  },

  // Obtener recetas por categoría
  async getRecipesByCategory(category) {
    try {
      const response = await apiService.get(`${API_CONFIG.ENDPOINTS.MEALS_BY_CATEGORY}${encodeURIComponent(category)}`);

      if (!response.meals) {
        return [];
      }

      // Para categorías, necesitamos obtener los detalles de cada receta
      const detailedRecipes = await Promise.all(
        response.meals.slice(0, 12).map(meal => this.getRecipeById(meal.idMeal))
      );

      return detailedRecipes.filter(Boolean);
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      throw new Error('Error al cargar recetas de la categoría');
    }
  },

  // Obtener recetas por área
  async getRecipesByArea(area) {
    try {
      const response = await apiService.get(`${API_CONFIG.ENDPOINTS.MEALS_BY_AREA}${encodeURIComponent(area)}`);

      if (!response.meals) {
        return [];
      }

      // Para áreas, necesitamos obtener los detalles de cada receta
      const detailedRecipes = await Promise.all(
        response.meals.slice(0, 12).map(meal => this.getRecipeById(meal.idMeal))
      );

      return detailedRecipes.filter(Boolean);
    } catch (error) {
      console.error('Error fetching recipes by area:', error);
      throw new Error('Error al cargar recetas del área');
    }
  },

  // Transformar receta de la API al formato de la aplicación
  transformRecipe(meal) {
    if (!meal) return null;

    // Extraer ingredientes y medidas
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient.trim(),
          measure: measure ? measure.trim() : '',
        });
      }
    }

    // Dividir instrucciones en pasos
    const instructions = meal.strInstructions
      ? meal.strInstructions
        .split(/\r?\n/)
        .filter(step => step.trim().length > 0)
        .map((step, index) => ({
          step: index + 1,
          instruction: step.trim(),
        }))
      : [];

    return {
      id: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: instructions,
      image: meal.strMealThumb,
      tags: meal.strTags ? meal.strTags.split(',').map(tag => tag.trim()) : [],
      ingredients: ingredients,
      youtube: meal.strYoutube,
      source: meal.strSource,
      // Campos adicionales calculados
      difficulty: this.calculateDifficulty(ingredients.length, instructions.length),
      estimatedTime: this.estimateTime(instructions.length),
      rating: Math.floor(Math.random() * 2) + 4, // Simulado entre 4-5
    };
  },

  // Calcular dificultad basada en ingredientes e instrucciones
  calculateDifficulty(ingredientsCount, instructionsCount) {
    const score = ingredientsCount + instructionsCount;

    if (score <= 15) return 'Fácil';
    if (score <= 25) return 'Intermedio';
    return 'Difícil';
  },

  // Estimar tiempo de cocción
  estimateTime(instructionsCount) {
    if (instructionsCount <= 5) return '< 30 min';
    if (instructionsCount <= 10) return '30-60 min';
    return '> 60 min';
  },
};

export default recipesService;
