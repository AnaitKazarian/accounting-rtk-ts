import './App.css'
import Guest from "./components/Guest";
import Profile from "./components/Profile";
import {Route, Routes, useNavigate} from "react-router";
import {useEffect} from "react";

function App() {
  const token = 'test';
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/profile');
    } else {
      navigate('');
    }
  }, [token, navigate]);

  return (
      <Routes>
        <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Guest />} />
      </Routes>
  );
}

export default App
