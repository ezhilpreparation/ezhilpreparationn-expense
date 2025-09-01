import { LogOut, User as UserIcon, Mail } from 'lucide-react';
import { useAuth, useLogout } from '../hooks/useAuth';

function Dashboard() {
  const { data: user } = useAuth();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center space-x-3">
              <span className="text-xl sm:text-2xl font-extrabold text-indigo-600">
                Expense
                <span className="text-lg sm:text-xl font-bold text-gray-900">Trace</span>
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              disabled={logout.isPending}
              className="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-sm sm:text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {logout.isPending ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Welcome Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
            <UserIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Welcome to ExpenseTrace!
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            You're successfully logged in and ready to start managing your finances.
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-8 sm:mb-12 max-w-2xl mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
            Account Information
          </h2>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-indigo-100 p-2 sm:p-3 rounded-lg">
                <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-medium text-gray-700">Full Name</p>
                <p className="text-base sm:text-lg text-gray-900">{user?.name || 'Not available'}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-medium text-gray-700">Email Address</p>
                <p className="text-base sm:text-lg text-gray-900">{user?.email || 'Not available'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Coming Soon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[
            {
              title: 'Expense Tracking',
              description: 'Track your daily expenses with ease',
              icon: '💰',
              color: 'bg-red-100 text-red-600'
            },
            {
              title: 'Budget Management',
              description: 'Set and monitor your budgets',
              icon: '🎯',
              color: 'bg-blue-100 text-blue-600'
            },
            {
              title: 'Financial Analytics',
              description: 'Get insights into your spending',
              icon: '📊',
              color: 'bg-green-100 text-green-600'
            },
            {
              title: 'Account Management',
              description: 'Manage multiple accounts',
              icon: '🏦',
              color: 'bg-purple-100 text-purple-600'
            },
            {
              title: 'Category Organization',
              description: 'Organize with custom categories',
              icon: '📁',
              color: 'bg-yellow-100 text-yellow-600'
            },
            {
              title: 'Reports & Insights',
              description: 'Detailed financial reports',
              icon: '📈',
              color: 'bg-indigo-100 text-indigo-600'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                <span className="text-xl sm:text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {feature.description}
              </p>
              <div className="mt-3 sm:mt-4">
                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gray-100 text-gray-600">
                  Coming Soon
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-4">
              Ready to start tracking?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              ExpenseTrace is being built to help you manage your finances better. 
              Stay tuned for exciting features coming your way!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base font-medium">
                Explore Features
              </button>
              <button className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;