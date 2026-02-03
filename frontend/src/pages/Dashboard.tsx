import { useNavigate } from 'react-router-dom';
import { Chatbot, Navbar } from '../components';
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

  // Mock data untuk stats
  const stats = [
    { title: 'Total Expenses', value: categories.length, change: '+17%', icon: '📊', trend: 'up' },
    { title: 'This Month', value: `Rp ${(totalExpense / 1000).toFixed(1)}k`, change: '↓ 12%', icon: '💰', trend: 'down' },
    { title: 'Categories', value: categories.length, change: '↑ 26%', icon: '📁', trend: 'up' },
    { title: 'Avg Expense', value: `${(totalExpense / Math.max(categories.length, 1) / 1000).toFixed(1)}k`, change: '↑ 10%', icon: '📈', trend: 'up' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Chatbot />
      
      {/* Main Content Area - Below Navbar */}
      <main className="lg:pl-20 pt-20">
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                    <span className="ml-2 text-2xl">{stat.icon}</span>
                  </div>
                </div>
              ))}
            </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sessions Overview - Takes 2 columns */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Expenses Overview</h3>
                  <div className="flex items-center space-x-3">
                    <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Last 30 days</option>
                      <option>Last 7 days</option>
                      <option>Last 90 days</option>
                    </select>
                    <button className="bg-gray-900 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-gray-800 transition flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download CSV</span>
                    </button>
                  </div>
                </div>

                {/* Chart Area - Simplified */}
                <div className="relative h-64">
                  <svg className="w-full h-full" viewBox="0 0 600 250" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.2 }} />
                        <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0 }} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,200 Q100,180 150,160 T300,140 Q400,120 500,100 T600,80"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="3"
                    />
                    <path
                      d="M0,200 Q100,180 150,160 T300,140 Q400,120 500,100 T600,80 L600,250 L0,250 Z"
                      fill="url(#gradient)"
                    />
                  </svg>
                  <div className="absolute top-1/4 left-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg">
                    +17%
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-100">
                  <div className="bg-gray-900 rounded-xl p-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">🌐</span>
                      <span className="text-xs text-gray-400">Top Browser</span>
                    </div>
                    <h4 className="font-semibold mb-1">Food</h4>
                    <p className="text-2xl font-bold">{categories[0]?.amount ? `${(categories[0].amount / 1000).toFixed(1)}k` : '0'} <span className="text-xs text-gray-400">/ Expenses</span></p>
                  </div>
                  <div className="bg-gray-900 rounded-xl p-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">💻</span>
                      <span className="text-xs text-gray-400">Top Platform</span>
                    </div>
                    <h4 className="font-semibold mb-1">Transport</h4>
                    <p className="text-2xl font-bold">{categories[1]?.amount ? `${(categories[1].amount / 1000).toFixed(1)}k` : '0'} <span className="text-xs text-gray-400">/ Expenses</span></p>
                  </div>
                  <div className="bg-gray-900 rounded-xl p-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">📱</span>
                      <span className="text-xs text-gray-400">Top Sources</span>
                    </div>
                    <h4 className="font-semibold mb-1">Shopping</h4>
                    <p className="text-2xl font-bold">{categories[2]?.amount ? `${(categories[2].amount / 1000).toFixed(1)}k` : '0'} <span className="text-xs text-gray-400">/ Expenses</span></p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Category Distribution */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Expenses by Category</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>

                  {/* Visual Blob */}
                  <div className="relative h-48 flex items-center justify-center mb-6">
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                      <defs>
                        <radialGradient id="blobGradient">
                          <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.8 }} />
                          <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.6 }} />
                        </radialGradient>
                      </defs>
                      <path
                        d="M100,40 Q140,50 150,90 Q160,130 120,150 Q80,170 60,130 Q40,90 60,60 Q80,30 100,40 Z"
                        fill="url(#blobGradient)"
                        className="animate-pulse"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <p className="text-3xl font-bold text-gray-900">30%</p>
                      <p className="text-sm text-gray-500">Total</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Food</p>
                      <p className="text-lg font-bold text-gray-900">30%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Transport</p>
                      <p className="text-lg font-bold text-gray-900">25%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Shopping</p>
                      <p className="text-lg font-bold text-gray-900">20%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Others</p>
                      <p className="text-lg font-bold text-gray-900">25%</p>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Statistics</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
                        <p className="text-xs text-gray-400">Max {categories.length}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-900">30%</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">This Month</p>
                        <p className="text-xs text-gray-400">Max {categories.length}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full border-4 border-purple-500 flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-900">87%</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Average Expense</p>
                        <span className="text-xs text-green-500 font-medium">+21%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-12 h-8" viewBox="0 0 50 30">
                          <polyline
                            points="0,25 10,20 20,22 30,15 40,18 50,10"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="2"
                          />
                        </svg>
                        <p className="text-2xl font-bold text-gray-900">{(totalExpense / 1000).toFixed(1)}k+</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Add Expense Button */}
          <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate('/add-expense')}
                className="bg-linear-to-r from-green-500 to-emerald-600 text-white py-3 px-8 rounded-xl hover:from-green-600 hover:to-emerald-700 transition duration-300 font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Expense</span>
              </button>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
