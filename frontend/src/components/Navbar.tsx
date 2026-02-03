import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Expense Tracker</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/dashboard')}
            className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${
              isActive('/dashboard') 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => navigate('/expenses')}
            className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${
              isActive('/expenses') || isActive('/add-expense')
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            💰 Expenses
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 font-semibold transition duration-200"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
