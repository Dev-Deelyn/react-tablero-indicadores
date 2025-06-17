import axios, { AxiosError } from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// 1) Interceptor de request: añade siempre el Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const userJSON = localStorage.getItem('user');
    let token: string | null = null;
    if (userJSON) {
      try {
        const userData = JSON.parse(userJSON);
        token = userData.token;
      } catch (error) {
        console.error('Error al parsear el usuario en localStorage:', error);
      }
    }
    // console.log('Intercepted request, token value:', token);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log('Headers finales en la request:', config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);


// 2) Interceptor de response: chequea correctamente el status
apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    if (status === 401) {
      // si recibís 401, redirigís a login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
