import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp/SignUp';
import LogIn from './pages/Login/LogIn';
import Mail from './pages/Mail';
import { useAppSelector } from './hooks';
import { useValidateTokenMutation } from './features/auth/authAPI';
import { useEffect } from 'react';
import { removeUser } from './features/auth/userSlice';
import { ResponseType } from './types/common';
import { useAppDispatch } from './hooks';

function App() {
  const token = useAppSelector((state) => state.user.token);
  const user = useAppSelector((state) => state.user.value);
  const [validateToken] = useValidateTokenMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      validateToken(token)
        .unwrap()
        .then((data: ResponseType<null>) => {
          if (!data.success) {
            dispatch(removeUser());
          } 
        })
        .catch(() => {
          dispatch(removeUser());
        });
    };

  }, [token]);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={ user ? <Navigate to="/mail" /> : <LogIn />} />
          <Route path="/signup" element={user ? <Navigate to="/mail" /> : <SignUp />} />
          <Route path="/mail" element={ !user ? <Navigate to="/login" /> : <Mail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
