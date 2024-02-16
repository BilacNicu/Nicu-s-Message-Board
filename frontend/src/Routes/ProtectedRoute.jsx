import { React, useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext.jsx';

const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AuthContext);
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;

  };
  
  

export default ProtectedRoute;
