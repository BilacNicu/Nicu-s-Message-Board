import { React, useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      // Call an endpoint to validate the session
      fetch('/validate-session', {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',
        },
         // Needed to include the HTTP-only cookie
      })
      .then(response => {
        if (response.ok) {
          setIsAuthenticated(true); // The session is valid
          navigate("/messageBoard");
        } else { 
          setIsAuthenticated(false); // The session is not valid
        }
      })
      .catch(error => {
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsLoading(false); // Update loading state once the fetch is complete
        });
      }, []);

      const login = async (username, password) => {
        try {
          const response = await fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
  
          if (response.ok) {
            setIsAuthenticated(true);
            setUsername(username);
            navigate("/messageBoard");
            // Optionally, you can also set user details in context here
          } else {
            alert("Wrong credentials you idiot"); // Or handle errors more gracefully
          }
        } catch (error) {
          alert("Network error"); // Or handle errors more gracefully
        }
      };
  

      const logout = async () => {
      try {
    const response = await fetch('/logout', {
      method: 'POST',
      credentials: 'include',
    });
    if (response.ok) {
      setIsAuthenticated(false);
      navigate('/login');
    } else {
      // handle error, e.g., show an error message
    }
  } catch (error) {
    console.error("Logout error:", error);
    // handle error, e.g., show an error message
  }
};


    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading, logout, login, username }}>
          {children}
        </AuthContext.Provider>
    );
};