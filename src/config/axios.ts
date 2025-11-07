import axios from 'axios';

// Cria uma instância do Axios com configurações personalizadas
const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiJsonServer = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiMockIO = axios.create({
  baseURL: 'https://675877bf60576a194d10a71b.mockapi.io/api/v1',
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de requisição
api.interceptors.request.use(
  (config) => {
    // Você pode adicionar tokens de autenticação aqui, se necessário
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tratamento de erros globais
    if (error.response) {
      // O servidor respondeu com um status fora do intervalo 2xx
      console.error('Erro na resposta:', error.response.data);
      console.error('Status:', error.response.status);
      // if (error.response.status === 401) {
      //   localStorage.removeItem('access_token');
      //   localStorage.removeItem('refresh_token');
      //   window.location.href = "/";
      // }
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      console.error('Erro na requisição:', error.request);
    } else {
      // Algo aconteceu ao configurar a requisição
      console.error('Erro:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
export { apiJsonServer, apiMockIO };
