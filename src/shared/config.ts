interface AppConfig {
  API_URL: string;
  AUTH_TOKEN_KEY: string;
}

export const config: AppConfig = {
    API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    AUTH_TOKEN_KEY: 'store-token', // Ключ для localStorage
};