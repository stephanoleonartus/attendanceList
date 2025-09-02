import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const userResponse = await api.get('/auth/user/');
          setUser(userResponse.data);
        } catch (error) {
          console.error('Failed to fetch user', error);
          setToken(null);
          localStorage.removeItem('token');
        }
      }
    };
    fetchUser();
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await api.post('auth/login/', { username, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw so LoginPage can handle it
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};