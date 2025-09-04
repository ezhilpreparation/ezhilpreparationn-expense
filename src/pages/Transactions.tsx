import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, ArrowUpDown, TrendingUp, TrendingDown, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useTransactions, useDeleteTransaction } from '../hooks/useTransactions';
import { TransactionFilters, TRANSACTION_TYPES } from '../types/transaction';
import { useFormatters } from '../hooks/useFormatters';
import { useCategoriesByType } from '../hooks/useCategories';
import { useAccounts } from '../hooks/useAccounts';
import CategoryIcon from '../components/CategoryIcon';
import CategorySelectModal from '../components/CategorySelectModal';
import AccountSelectModal from '../components/AccountSelectModal';
import ConfirmationModal from '../components/ConfirmationModal';

const tabs = ['All', 'Expense', 'Income', 'Transfer'];

function Transactions() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [filters, setFilters] = useState<TransactionFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [transactionToDelete, setTransactionToDelete] = useState<{ id: string; description: string } | null>(null);
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
  const [isAccountFilterOpen, setIsAccountFilterOpen] = useState(false);

  // Get filter data
  const { data: expenseCategories = [] } = useCategoriesByType(1);
  const { data: incomeCategories = [] } = useCategoriesByType(2);
  const { data: accounts = [] } = useAccounts();

  const allCategories = [...expenseCategories, ...incomeCategories];

  // Build filters based on active tab
  const getFilters = (): TransactionFilters => {
    const baseFilters = { ...filters, search: searchTerm };
    
    switch (activeTab) {
      case 1: // Expense
        return { ...baseFilters, type: 1 };
      case 2: // Income
        return { ...baseFilters, type: 2 };
      case 3: // Transfer
        return { ...baseFilters, type: 3 };
      default: // All
        return baseFilters;
    }
  };

  const { data: transactionsData, isLoading } = useTransactions(currentPage, pageSize, getFilters());
  const deleteTransaction = useDeleteTransaction();
  const { formatCurrency } = useFormatters();

  const handleDeleteTransaction = async () => {
    if (transactionToDelete) {
      try {
        await deleteTransaction.mutateAsync(transactionToDelete.id);
        setTransactionToDelete(null);
      } catch (error) {
        console.error('Failed to delete transaction:', error);
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(0);
  };

  const handleCategoryFilter = (category: any) => {
    setFilters(prev => ({ ...prev, categoryId: category.id }));
    setCurrentPage(0);
  };

  const handleAccountFilter = (account: any) => {
    setFilters(prev => ({ ...prev, accountId: account.id }));
    setCurrentPage(0);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setCurrentPage(0);
  };

  const getTransactionIcon = (type: number) => {
    switch (type) {
      case 1: // Expense
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      case 2: // Income
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 3: // Transfer
        return <ArrowUpDown className="w-5 h-5 text-blue-600" />;
      default:
        return <ArrowUpDown className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAmountColor = (type: number) => {
    switch (type) {
      case 1: // Expense
        return 'text-red-600';
      case 2: // Income
        return 'text-green-600';
      case 3: // Transfer
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const selectedCategory = allCategories.find(cat => cat.id === filters.categoryId);
  const selectedAccount = accounts.find(acc => acc.id === filters.accountId);

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="h-12 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const transactions = transactionsData?.content || [];
  const totalPages = transactionsData?.totalPages || 0;
  const totalElements = transactionsData?.totalElements || 0;

  return (
    <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Track all your financial transactions</p>
        </div>
        <Link
          to="/transactions/add"
          className="mt-3 sm:mt-0 inline-flex items-center px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
          Add Transaction
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        {tabs.map((tab, index) => {
          const active = activeTab === index;
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(index);
                setCurrentPage(0);
              }}
              className={`flex-1 text-xs sm:text-sm font-medium rounded-lg py-2 transition-all duration-200 ${
                active
                  ? "bg-white shadow text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
        <form onSubmit={handleSearch} className="space-y-4">
          {/* Search */}
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              Search
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCategoryFilterOpen(true)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                {selectedCategory ? selectedCategory.name : 'Category'}
              </button>
              {selectedCategory && (
                <button
                  type="button"
                  onClick={() => {
                    setFilters(prev => ({ ...prev, categoryId: undefined }));
                    setCurrentPage(0);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Account Filter */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAccountFilterOpen(true)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                {selectedAccount ? selectedAccount.name : 'Account'}
              </button>
              {selectedAccount && (
                <button
                  type="button"
                  onClick={() => {
                    setFilters(prev => ({ ...prev, accountId: undefined }));
                    setCurrentPage(0);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Clear All Filters */}
            {(filters.categoryId || filters.accountId || searchTerm) && (
              <button
                type="button"
                onClick={clearFilters}
                className="px-3 py-2 text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Clear All
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            {tabs[activeTab]} Transactions ({totalElements})
          </h2>
        </div>

        {transactions.length === 0 ? (
          <div className="p-6 sm:p-8 text-center">
            <ArrowUpDown className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
              No transactions yet
            </h3>
            <p className="text-sm sm:text-base text-gray-500 mb-4">
              Start tracking your finances by adding your first transaction
            </p>
            <Link
              to="/transactions/add"
              className="inline-flex items-center px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Add Transaction
            </Link>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="p-3 sm:p-4 lg:p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        {transaction.category ? (
                          <CategoryIcon
                            icon={transaction.category.icon}
                            color={transaction.category.color}
                            size="sm"
                          />
                        ) : (
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            {getTransactionIcon(transaction.type)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                            {transaction.description || 'No description'}
                          </p>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 flex-shrink-0">
                            {TRANSACTION_TYPES[transaction.type]}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                          <span>{new Date(transaction.txnAt).toLocaleDateString()}</span>
                          
                          {transaction.category && (
                            <span className="flex items-center">
                              • {transaction.category.name}
                            </span>
                          )}

                          {transaction.account && (
                            <span className="hidden sm:flex items-center">
                              • {transaction.account.name}
                            </span>
                          )}

                          {transaction.type === 3 && transaction.fromAccount && transaction.toAccount && (
                            <span className="hidden md:flex items-center">
                              • {transaction.fromAccount.name} → {transaction.toAccount.name}
                            </span>
                          )}

                          {transaction.tags && transaction.tags.length > 0 && (
                            <span className="hidden lg:inline truncate">
                              • {transaction.tags.map(tag => tag.name).join(', ')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className={`text-sm sm:text-base font-semibold ${getAmountColor(transaction.type)}`}>
                          {transaction.type === 1 ? '-' : transaction.type === 2 ? '+' : ''}
                          {formatCurrency(transaction.amount)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Link
                          to={`/transactions/edit/${transaction.id}`}
                          className="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-md hover:bg-gray-100"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setTransactionToDelete({ 
                            id: transaction.id, 
                            description: transaction.description || 'transaction' 
                          })}
                          disabled={deleteTransaction.isPending}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50 rounded-md hover:bg-gray-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 sm:p-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
                    Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalElements)} of {totalElements} transactions
                  </div>

                  <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                      disabled={currentPage === 0}
                      className="p-1.5 sm:p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <span className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium bg-gray-50 rounded-md">
                      Page {currentPage + 1} of {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                      disabled={currentPage >= totalPages - 1}
                      className="p-1.5 sm:p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Category Filter Modal */}
      <CategorySelectModal
        isOpen={isCategoryFilterOpen}
        onClose={() => setIsCategoryFilterOpen(false)}
        categories={allCategories}
        onSelect={handleCategoryFilter}
        selectedCategory={selectedCategory}
        title="Filter by Category"
      />

      {/* Account Filter Modal */}
      <AccountSelectModal
        isOpen={isAccountFilterOpen}
        onClose={() => setIsAccountFilterOpen(false)}
        accounts={accounts}
        onSelect={handleAccountFilter}
        selectedAccount={selectedAccount}
        title="Filter by Account"
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!transactionToDelete}
        onClose={() => setTransactionToDelete(null)}
        onConfirm={handleDeleteTransaction}
        title="Delete Transaction"
        message={`Are you sure you want to delete "${transactionToDelete?.description}" transaction? This action cannot be undone and may affect your account balances.`}
        confirmText="Delete Transaction"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        isPending={deleteTransaction.isPending}
      />
    </div>
  );
}

export default Transactions;