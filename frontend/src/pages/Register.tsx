import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Password dan Konfirmasi Password tidak sama!');
      return;
    }
    
    await register({ name, email, password, confirmPassword });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 overflow-hidden">
      <div className="w-full max-w-md px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-3">Register</h2>
          <p className="text-white/90 text-sm">Create your account to get started</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              placeholder="••••••••"
              required
            />
          </div>
        </form>

        {/* Buttons - Outside Form */}
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex-1 bg-white text-blue-600 font-bold py-3.5 px-6 rounded-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-200 shadow-lg"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="flex-1 bg-white text-blue-600 font-bold py-3.5 px-6 rounded-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-200 shadow-lg"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
