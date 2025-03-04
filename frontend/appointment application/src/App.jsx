import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import PrivateRoute from "./Components/PrivateRoute.jsx";
import Dashboard from './Components/Dashboard'
import { AuthContext } from './Context/AuthContext'
import { useContext, useEffect } from 'react';
import ResetPassword from './Components/ResetPassword.jsx';



function App() {
  
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        <Route path='/reset' element={<ResetPassword/>}/>
      </Routes>
      
    </div>
  )
}

export default App
