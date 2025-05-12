import $api from '../../../shared/api/client';

// Типы для данных запросов
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  name: string;
}

// Тип ответа от API
interface AuthResponse {
  token: string; // JWT-токен
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Логин
export const loginAPI = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await $api.post<AuthResponse>('/auth/login', { email, password });
  return response.data;
};

// Регистрация
export const registerAPI = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await $api.post<AuthResponse>('/auth/register', data);
  return response.data;
};

// Проверка авторизации 
export const checkAuthAPI = async (): Promise<AuthResponse> => {
  const response = await $api.get<AuthResponse>('/auth/me');
  return response.data;
};

export const logoutAPI = async (): Promise<AuthResponse> => {
  const response = await $api.post<AuthResponse>('/auth/logout');
  return response.data;
};