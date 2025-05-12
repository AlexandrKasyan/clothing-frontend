import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { logout } from '../authSlice';

export const useAuth = () => {
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return {
    user,
    isAuth: !!user,
    isLoading,
    error,
    logout: () => dispatch(logout()),
  };
};