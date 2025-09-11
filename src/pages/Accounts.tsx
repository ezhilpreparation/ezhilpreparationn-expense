import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, CreditCard, Wallet, Building2, Banknote, Eye, EyeOff } from 'lucide-react';
import {
  useAccounts,
  useBankAccounts,
  useWalletAccounts,
  useCreditCardAccounts,
  useCashAccounts,
  useAccountSummary,
  useDeleteAccount
} from '../hooks/useAccounts';
import { useFormatters } from '../hooks/useFormatters';
import ConfirmationModal from '../components/ConfirmationModal';

const tabs = ['All', 'Bank', 'Wallet', 'Credit Card', 'Cash'];

function Accounts() {
  const [activeTab, setActiveTab] = useState(0);
  const [showBalance, setShowBalance] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<{ id: string; name: string } | null>(null);
  
  const { data: allAccounts = [], isLoading: allAccountsLoading } = useAccounts();
  const { data: bankAccounts = [], isLoading: bankLoading } = useBankAccounts();
  const { data: walletAccounts = [], isLoading: walletLoading } = useWalletAccounts();
  const { data: creditCardAccounts = [], isLoading: creditLoading } = useCreditCardAccounts();
  const { data: cashAccounts = [], isLoading: cashLoading } = useCashAccounts();
  const { data: summary, isLoading: summaryLoading } = useAccountSummary();
  const deleteAccount = useDeleteAccount();
  const { formatCurrency } = useFormatters();

  const handleDeleteAccount = async () => {
    if (accountToDelete) {
      try {
        await deleteAccount.mutateAsync(accountToDelete.id);
        setAccountToDelete(null);
      } catch (error) {
        console.error('Failed to delete account:', error);
      }
    }
  };

  const formatCurrencyWithVisibility = (amount: number) => {
    return showBalance ? formatCurrency(amount) : '****';
  };

  const getAccountIcon = (type: number) => {
    switch (type) {
      case 1:
        return <Building2 className="w-5 h-5" />;
      case 2:
        return <Wallet className="w-5 h-5" />;
      case 3:
        return <CreditCard className="w-5 h-5" />;
      case 4:
        return <Banknote className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  const getAccountTypeColor = (type: number) => {
    switch (type) {
      case 1:
        return 'bg-blue-100 text-blue-700';
      case 2:
        return 'bg-green-100 text-green-700';
      case 3:
        return 'bg-purple-100 text-purple-700';
      case 4:
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getAccountTypeName = (type: number) => {
    switch (type) {
      case 1: return 'Bank Account';
      case 2: return 'Wallet';
      case 3: return 'Credit Card';
      case 4: return 'Cash';
      default: return 'Account';
    }
  };

  const getCurrentAccounts = () => {
    switch (activeTab) {
      case 1: return bankAccounts;
      case 2: return walletAccounts;
      case 3: return creditCardAccounts;
      case 4: return cashAccounts;
      default: return allAccounts;
    }
  };

  const isCurrentTabLoading = () => {
    switch (activeTab) {
      case 1: return bankLoading;
      case 2: return walletLoading;
      case 3: return creditLoading;
      case 4: return cashLoading;
      default: return allAccountsLoading;
    }
  };

  if (allAccountsLoading || summaryLoading) {
    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const currentAccounts = getCurrentAccounts();

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>
          <p className="text-sm text-gray-500">
            Manage your bank accounts, wallets, and credit cards
          </p>
          <p className="text-xs text-yellow-600 mt-1">
            * Transaction-based balance, actual may vary.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-3 sm:mt-0">
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showBalance ? 'Hide Balance' : 'Show Balance'}
          </button>
          <Link
            to="/accounts/add"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow hover:bg-indigo-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add Account
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Available Balance</h3>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrencyWithVisibility(summary?.availableAmount || 0)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total across all accounts</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Available Credit</h3>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrencyWithVisibility(summary?.availableCredit || 0)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Credit cards available limit</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Outstanding Credit</h3>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrencyWithVisibility(summary?.outstandingCredit || 0)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total outstanding amount</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 rounded-full p-1 w-fit mb-6">
        {tabs.map((tab, index) => {
          const active = activeTab === index;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                active
                  ? 'bg-white shadow text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Accounts */}
      {isCurrentTabLoading() ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      ) : currentAccounts.length === 0 ? (
        <div className="p-10 text-center">
          <div className={`p-3 rounded-xl mx-auto mb-4 w-fit ${
            activeTab === 1 ? 'bg-blue-100' :
            activeTab === 2 ? 'bg-green-100' :
            activeTab === 3 ? 'bg-purple-100' :
            activeTab === 4 ? 'bg-yellow-100' : 'bg-gray-100'
          }`}>
            {activeTab === 1 ? <Building2 className="w-8 h-8 text-blue-600" /> :
             activeTab === 2 ? <Wallet className="w-8 h-8 text-green-600" /> :
             activeTab === 3 ? <CreditCard className="w-8 h-8 text-purple-600" /> :
             activeTab === 4 ? <Banknote className="w-8 h-8 text-yellow-600" /> :
             <CreditCard className="w-8 h-8 text-gray-600" />}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {tabs[activeTab].toLowerCase()} accounts yet
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Create your first {tabs[activeTab].toLowerCase()} account to start tracking your finances
          </p>
          <Link
            to="/accounts/add"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add Account
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentAccounts.map((account) => (
            <div
              key={account.id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${getAccountTypeColor(account.type)}`}>
                    {getAccountIcon(account.type)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{account.name}</h3>
                    <p className="text-xs text-gray-500">
                      {getAccountTypeName(account.type)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/accounts/edit/${account.id}`}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setAccountToDelete({ id: account.id, name: account.name })}
                    disabled={deleteAccount.isPending}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {account.type === 3 ? (
                  // Credit Card specific display
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-medium">
                        {formatCurrencyWithVisibility(account.currentAvailableLimit || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Limit:</span>
                      <span className="font-medium">
                        {formatCurrencyWithVisibility(account.totalCreditLimit || 0)}
                      </span>
                    </div>
                    {account.paymentDueDate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-medium">
                          {new Date(account.paymentDueDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  // Bank, Wallet, Cash display
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Balance:</span>
                    <span className="font-medium">
                      {formatCurrencyWithVisibility(account.currentBalance || 0)}
                    </span>
                  </div>
                )}

                {account.linkedPaymentModes && account.linkedPaymentModes.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment Modes:</span>
                    <span className="font-medium">
                      {account.linkedPaymentModes.length}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!accountToDelete}
        onClose={() => setAccountToDelete(null)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message={`Are you sure you want to delete "${accountToDelete?.name}" account? This action cannot be undone and may affect your transaction history.`}
        confirmText="Delete Account"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        isPending={deleteAccount.isPending}
      />
    </div>
  );
}

export default Accounts;