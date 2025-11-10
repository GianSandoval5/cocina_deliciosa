import axios from 'axios';
import { API_CONFIG } from '../constants/index.js';

// Configuración del cliente HTTP
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('La solicitud tardó demasiado tiempo. Inténtalo de nuevo.');
    }
    
    if (error.response) {
      switch (error.response.status) {
        case 404:
          throw new Error('Recurso no encontrado');
        case 500:
          throw new Error('Error interno del servidor');
        default:
          throw new Error('Ocurrió un error inesperado');
      }
    }
    
    if (error.request) {
      throw new Error('Error de conexión. Verifica tu conexión a internet.');
    }
    
    throw error;
  }
);

export const apiService = {
  // Método genérico para hacer peticiones GET
  async get(endpoint, params = {}) {
    try {
      const response = await apiClient.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Método genérico para hacer peticiones POST
  async post(endpoint, data) {
    try {
      const response = await apiClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Método genérico para hacer peticiones PUT
  async put(endpoint, data) {
    try {
      const response = await apiClient.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Método genérico para hacer peticiones DELETE
  async delete(endpoint) {
    try {
      const response = await apiClient.delete(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;