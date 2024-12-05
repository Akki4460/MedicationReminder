export const setToken = (token: string) => {
    localStorage.setItem('token', token);
  };
  
  export const getToken = (): string | null => {
    return localStorage.getItem('token');
  };
  
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  export const setUserDetails = (id: string, role: string) => {
    localStorage.setItem('id', id);
    localStorage.setItem('role', role);
  };
  
  export const getUserDetails = (): { id: string | null; role: string | null } => {
    return {
      id: localStorage.getItem('id'),
      role: localStorage.getItem('role'),
    };
  };
  
  export const clearUserDetails = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('role');
  };
  