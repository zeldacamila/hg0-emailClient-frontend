import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp/SignUp';
import LogIn from './pages/Login/LogIn';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
