//import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import LoginPage from './features/auth/components/LoginForm';


function App() {
  const { user } = useAppSelector((state) => state.auth);
  //const dispatch = useAppDispatch();

  // useEffect(() => {
  //   // Проверка авторизации при монтировании
  //   dispatch(checkAuth());
  // }, [dispatch]);



  return (
    <div className="app">
      {/* <Header user={user} onLogout={() => dispatch(logout())} /> */}
      
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/login" element={
          !user ? <LoginPage /> : <Navigate to="/profile" replace />
        } />
        
        
        {/* Дефолтный маршрут */}
        <Route path="/" element={
          <Navigate to={user ? '/profile' : '/'} replace />
        } />
      </Routes>
    </div>
  );
}

export default App;