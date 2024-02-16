import { React, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext.jsx';

const PublicRoute = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? <Navigate to="/messageBoard" /> : <Outlet />;

  };
  
  

export default PublicRoute;
