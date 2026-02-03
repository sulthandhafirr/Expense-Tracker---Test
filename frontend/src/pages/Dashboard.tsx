import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Data dummy untuk preview
  const totalExpense = 2500000;
  const categories = [
    { name: 'Makanan', amount: 800000, color: 'bg-blue-500' },
    { name: 'Transport', amount: 500000, color: 'bg-green-500' },
    { name: 'Belanja', amount: 700000, color: 'bg-yellow-500' },
    { name: 'Hiburan', amount: 300000, color: 'bg-purple-500' },
    { name: 'Lainnya', amount: 200000, color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Expense Tracker</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-blue-600 font-medium"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/expenses')}
              className="text-gray-600 hover:text-gray-800"
            >
              Expenses
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-gray-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h2>
          <p className="text-gray-600">Ringkasan pengeluaran Anda</p>
        </div>

        {/* Total Expense Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Total Pengeluaran</h3>
          <p className="text-4xl font-bold text-gray-800">
            Rp {totalExpense.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Pengeluaran per Kategori</h3>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{category.name}</span>
                  <span className="font-bold text-gray-800">
                    Rp {category.amount.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${category.color} h-3 rounded-full`}
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
            className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-200 font-medium text-lg"
          >
            + Tambah Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
