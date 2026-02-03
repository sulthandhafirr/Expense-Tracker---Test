import { useNavigate } from 'react-router-dom';

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useAuth = () => {
  const navigate = useNavigate();

  const login = async (formData: LoginForm) => {
    // Bypass authentication - langsung login tanpa database
    const dummyUser = {
      id: '123456',
      name: 'Demo User',
      email: formData.email
    };
    
    const dummyToken = 'demo-token-' + Date.now();
    
    // Save to localStorage
    localStorage.setItem('token', dummyToken);
    localStorage.setItem('user', JSON.stringify(dummyUser));
    
    navigate('/dashboard');
    return { success: true };
  };

  const register = async (formData: RegisterForm) => {
    // Bypass registration - langsung register tanpa database
    const dummyUser = {
      id: '123456',
      name: formData.name,
      email: formData.email
    };
    
    const dummyToken = 'demo-token-' + Date.now();
    
    // Save to localStorage
    localStorage.setItem('token', dummyToken);
    localStorage.setItem('user', JSON.stringify(dummyUser));
    
    navigate('/dashboard');
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return {
    login,
    register,
    logout
  };
};
