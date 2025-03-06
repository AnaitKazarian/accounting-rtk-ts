import './App.css'
import Guest from "./components/Guest";
import Profile from "./components/Profile";
import {Route, Routes, useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

function App() {
  const token: string = 'test';
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token.length === 0 && location.pathname !== '/') {
      navigate('/', { replace: true });
    } else if (token.length > 0 && location.pathname !== '/profile') {
      navigate('/profile', { replace: true });
    }
  }, [token, location.pathname, navigate]);

  return (
      <Routes>
        <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Guest />} />
      </Routes>
  );
}

export default App
