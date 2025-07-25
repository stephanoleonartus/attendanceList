export const storeToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  export const verifyToken = async (token) => {
    // TODO: Replace with actual token verification
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          role: 'admin'
        });
      }, 500);
    });
  };