import { ThunkAction, Action } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

// Типы для всего хранилища
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Тип для thunk-действий
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown, // Дополнительный аргумент (например, API-клиент)
  Action<string> 
>;

// Типизированный useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();