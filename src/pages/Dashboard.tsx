import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Target,
  CreditCard,
} from 'lucide-react';
import { useFormatters } from '../hooks/useFormatters';

const monthlyData = [
  { name: 'Jan', spending: 2400, budget: 3000 },
  { name: 'Feb', spending: 2800, budget: 3000 },
  { name: 'Mar', spending: 2200, budget: 3000 },
  { name: 'Apr', spending: 3100, budget: 3000 },
  { name: 'May', spending: 2900, budget: 3000 },
  { name: 'Jun', spending: 2600, budget: 3000 },
];

const categoryData = [
  { name: 'Food', value: 35, color: '#8B5CF6' },
  { name: 'Transportation', value: 20, color: '#10B981' },
  { name: 'Shopping', value: 15, color: '#F59E0B' },
  { name: 'Entertainment', value: 12, color: '#EF4444' },
  { name: 'Utilities', value: 10, color: '#3B82F6' },
  { name: 'Other', value: 8, color: '#6B7280' },
];

function Dashboard() {
  const { formatCurrency } = useFormatters();

  const recentTransactions = [
    { id: 1, description: 'Grocery Store', category: 'Food', amount: -85.5, date: '2025-01-15' },
    { id: 2, description: 'Gas Station', category: 'Transportation', amount: -45.2, date: '2025-01-14' },
    { id: 3, description: 'Salary', category: 'Income', amount: 2600.0, date: '2025-01-13' },
    { id: 4, description: 'Netflix', category: 'Entertainment', amount: -15.99, date: '2025-01-12' },
    { id: 5, description: 'Amazon', category: 'Shopping', amount: -129.99, date: '2025-01-11' },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track your expenses and financial goals
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spending</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(2840)}</p>
            </div>
            <div className="bg-red-100 rounded-full p-3">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-1 flex items-center text-sm">
            <span className="text-red-600">-12%</span>
            <span className="text-gray-600 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Budget</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(3000)}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-1 flex items-center text-sm">
            <span className="text-green-600">{formatCurrency(160)} left</span>
            <span className="text-gray-600 ml-2">this month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Income</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(5200)}</p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-1 flex items-center text-sm">
            <span className="text-green-600">+8%</span>
            <span className="text-gray-600 ml-2">from last month</span>
          </div>
        </div>
      </div>


      {/* Recent Transactions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-md transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                    }`}
                >
                  {transaction.amount > 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <CreditCard className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {transaction.description}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">{transaction.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                  {transaction.amount > 0 ? '+' : ''}
                  {formatCurrency(Math.abs(transaction.amount))}
                </p>
                <p className="text-xs text-gray-500">{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-8">
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Spending vs Budget
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="spending" fill="#6366F1" />
                <Bar dataKey="budget" fill="#E5E7EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Spending by Category
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;