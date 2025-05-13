import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { checkAuthAPI, loginAPI, logoutAPI } from './api/authAPI';
import axios from 'axios';

interface AuthState {
    user: null | { id: string; email: string; name: string };
    isAuthChecked: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthChecked: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ id: string; email: string; name: string} | null>) => {
            state.user = action.payload;
            state.isAuthChecked = true;
        },
        setAuthChecked: (state, action: PayloadAction<boolean>) => {
            state.isAuthChecked = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },

});

export const { setUser, setLoading, setError, logout, setAuthChecked  } = authSlice.actions;

export const checkAuth = (): AppThunk => async (dispatch) => {
    try {
        const data = await checkAuthAPI();
        dispatch(setUser(data.user));
    } catch {
        dispatch(setUser(null));
    } finally {
        dispatch(setAuthChecked(true));
    }
};

export const logoutUser = (): AppThunk => async (dispatch) => {
    const data = await logoutAPI();
    dispatch(setUser(null));
};

// Асинхронные действия (Thunks)
export const loginUser =
    (email: string, password: string): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(setLoading(true));
                const data = await loginAPI(email, password);
                localStorage.setItem('token', data.token);
                dispatch(setUser(data.user));
            } catch (err) {
                let errorMessage = 'Ошибка входа';
                if (axios.isAxiosError(err) && err.response) {
                    errorMessage = err.response.data?.message || errorMessage;
                }
                dispatch(setError(errorMessage));
            } finally {
                dispatch(setLoading(false));
            }
        };



export default authSlice.reducer;