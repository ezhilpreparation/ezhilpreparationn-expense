export interface MonthSummaryItem {
  expense: number;
  income: number;
  day: number;
}

export interface MonthSummaryResponse {
  message: string;
  data: MonthSummaryItem[];
}

export interface DayTransaction {
  id: string;
  type: number | null;
  txnAt: string;
  amount: number;
  categoryId: string | null;
  accountId: string | null;
  description: string | null;
  tagIds: string[] | null;
  account?: {
    id: string;
    name: string;
    type: number;
  };
  paymentMode?: {
    id: string;
    name: string;
    type: number;
  };
}

export interface DaySummary {
  spending: number;
  income: number;
  transactions: DayTransaction[];
}

export interface DaySummaryResponse {
  message: string;
  data: DaySummary;
}