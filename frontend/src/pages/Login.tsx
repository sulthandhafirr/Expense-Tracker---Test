import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { login } = useAuth();

  const slides = [
    {
      title: 'Welcome to Expense Tracker',
      subtitle: 'Manage your expenses efficiently',
      icon: '💰'
    },
    {
      title: 'Smart Analytics',
      subtitle: 'Track and analyze your spending',
      icon: '📊'
    },
    {
      title: 'AI Chatbot',
      subtitle: 'Get insights with AI assistance',
      icon: '🤖'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Branding with Carousel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-50 relative">
        {/* Carousel Container */}
        <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
          {/* Slides */}
          <div 
            className="flex transition-transform duration-500 ease-in-out w-full h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="min-w-full h-full flex flex-col items-center justify-center px-16">
                {/* Logo */}
                <div className="mb-12">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-6xl">{slide.icon}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center max-w-md">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-gray-600 mb-8">
                    {slide.subtitle}
                  </p>
                  <p className="text-sm text-gray-500">VERSION 2.5</p>
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-12">
                  <button className="text-blue-500 hover:text-blue-600 font-medium transition">
                    Features
                  </button>
                  <span className="text-gray-300">|</span>
                  <button className="text-blue-500 hover:text-blue-600 font-medium transition">
                    About
                  </button>
                  <span className="text-gray-300">|</span>
                  <button className="text-blue-500 hover:text-blue-600 font-medium transition">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition z-10"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition z-10"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition ${
                  currentSlide === index ? 'bg-blue-500 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-3">Sign in</h2>
            <p className="text-white/90 text-sm">
              Please enter your User ID and Password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User ID */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                User id
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                placeholder="admin123@gmail.com"
                required
              />
            </div>

            {/* Password */}
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

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-300"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm font-medium text-white">
                Remember me
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-50 hover:shadow-lg transition-all duration-200"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="flex-1 bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-50 hover:shadow-lg transition-all duration-200"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
