import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Building2, Wallet, CreditCard, Banknote } from 'lucide-react';
import {
  useBankAccounts,
  useWalletAccounts,
  useCreditCardAccounts,
  useCashAccounts,
  useAccountSummary,
  useDeleteAccount,
} from '../hooks/useAccounts';
import { useFormatters } from '../hooks/useFormatters';
import ConfirmationModal from '../components/ConfirmationModal';

function Accounts() {
  const [accountToDelete, setAccountToDelete] = useState<{ id: string; name: string } | null>(null);

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

  if (summaryLoading || bankLoading || walletLoading || creditLoading || cashLoading) {
    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const sections = [
    { title: 'Bank Accounts', icon: <Building2 className="w-5 h-5 text-indigo-500" />, data: bankAccounts },
    { title: 'Wallets', icon: <Wallet className="w-5 h-5 text-green-500" />, data: walletAccounts },
    { title: 'Credit Cards', icon: <CreditCard className="w-5 h-5 text-purple-500" />, data: creditCardAccounts },
    { title: 'Cash Accounts', icon: <Banknote className="w-5 h-5 text-yellow-500" />, data: cashAccounts },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>
          <p className="text-sm text-gray-500">Manage your bank, wallet, credit card and cash accounts</p>
        </div>
        <Link
          to="/accounts/add"
          className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow hover:bg-indigo-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add Account
        </Link>
      </div>

      {/* Balance Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-sm text-gray-500 mb-2">Available Balance</h3>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(summary?.availableAmount || 0)}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-sm text-gray-500 mb-2">Outstanding Credit</h3>
          <p className="text-xl font-bold text-red-600">{formatCurrency(summary?.outstandingCredit || 0)}</p>
        </div>
      </div>

      {/* Account Sections */}
      <div className="space-y-10">
        {sections.map(({ title, icon, data }) => (
          <>
            {data.length !== 0 && (
              <div key={title}>
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                  {icon}
                  {title}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data.map((account) => (
                    <div
                      key={account.id}
                      className="bg-white rounded-xl shadow p-4 flex justify-between items-center hover:shadow-md transition"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">{account.name}</h3>
                        <p className="text-sm text-gray-500">
                          Balance: {formatCurrency(account.currentBalance || account.currentAvailableLimit || 0)}
                        </p>
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
                  ))}
                </div>
              </div>
            )}</>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!accountToDelete}
        onClose={() => setAccountToDelete(null)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message={`Are you sure you want to delete "${accountToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete Account"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        isPending={deleteAccount.isPending}
      />
    </div>
  );
}

export default Accounts;