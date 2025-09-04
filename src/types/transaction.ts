export interface Transaction {
  id: string;
  type: 1 | 2 | 3; // 1 = Expense, 2 = Income, 3 = Transfer
  txnAt: string;
  amount: number;
  description: string;
  category?: {
    id: string;
    name: string;
    icon: string;
    color: string;
    type: number;
    deletable: boolean;
  };
  account?: {
    id: string;
    name: string;
    type: number;
    default: boolean;
  };
  fromAccount?: {
    id: string;
    name: string;
    type: number;
    default: boolean;
  };
  toAccount?: {
    id: string;
    name: string;
    type: number;
    default: boolean;
  };
  paymentMode?: {
    id: string;
    name: string;
    type: number;
  };
  fromPaymentMode?: {
    id: string;
    name: string;
    type: number;
  };
  toPaymentMode?: {
    id: string;
    name: string;
    type: number;
  };
  tags?: {
    id: string;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionData {
  type: 1 | 2 | 3;
  date: number;
  month: number;
  year: number;
  amount: number;
  description: string;
  categoryId?: string;
  accountId: string;
  fromAccountId?: string;
  toAccountId?: string;
  paymentModeId?: string;
  fromPaymentModeId?: string;
  toPaymentModeId?: string;
  tagIds?: string[];
  tags?: string[];
}

export interface UpdateTransactionData {
  type?: 1 | 2 | 3;
  date?: number;
  month?: number;
  year?: number;
  amount?: number;
  description?: string;
  categoryId?: string;
  accountId?: string;
  fromAccountId?: string;
  toAccountId?: string;
  paymentModeId?: string;
  fromPaymentModeId?: string;
  toPaymentModeId?: string;
  tagIds?: string[];
  tags?: string[];
}

export interface TransactionFilters {
  search?: string;
  type?: 1 | 2 | 3;
  categoryId?: string;
  accountId?: string;
  startDate?: string;
  endDate?: string;
}

export interface PaginatedTransactions {
  content: Transaction[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export const TRANSACTION_TYPES = {
  '1': 'Expense',
  '2': 'Income',
  '3': 'Transfer'
} as const;

export type TransactionType = keyof typeof TRANSACTION_TYPES;