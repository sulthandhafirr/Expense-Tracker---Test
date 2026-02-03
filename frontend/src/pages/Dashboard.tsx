import { useNavigate } from 'react-router-dom';
import { Navbar, Chatbot } from '../components';
import { useExpenses } from '../hooks';
import { CATEGORY_COLORS } from '../constants';

const Dashboard = () => {
  const navigate = useNavigate();
  const { getTotalExpense, getExpensesByCategory } = useExpenses();

  const totalExpense = getTotalExpense();
  const categoryTotals = getExpensesByCategory();
  
  const categories = Object.entries(categoryTotals).map(([name, amount]) => ({
    name,
    amount,
    color: CATEGORY_COLORS[name as keyof typeof CATEGORY_COLORS] || 'bg-gray-500'
  }));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">Dashboard</h2>
          <p className="text-gray-600 text-lg">Ringkasan pengeluaran Anda</p>
        </div>

        {/* Total Expense Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 mb-8 text-white transform hover:scale-105 transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-blue-100 mb-2">💎 Total Pengeluaran</h3>
              <p className="text-5xl font-bold">
                Rp {totalExpense.toLocaleString('id-ID')}
              </p>
            </div>
            <div className="p-4 bg-white bg-opacity-20 rounded-full">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-2">📊</span> Pengeluaran per Kategori
          </h3>
          <div className="space-y-5">
            {categories.map((category, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition duration-200">{category.name}</span>
                  <span className="font-bold text-gray-900 text-lg">
                    Rp {category.amount.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`${category.color} h-4 rounded-full transition-all duration-500 ease-out transform group-hover:scale-x-105`}
                    style={{ width: `${(category.amount / totalExpense) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Expense Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/add-expense')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-10 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition duration-300 font-bold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2"
          >
            <span className="text-2xl">+</span>
            <span>Tambah Expense</span>
          </button>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Dashboard;
