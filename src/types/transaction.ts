export interface Transaction {
  id: number,
  title: string,
  type: "deposit" | "withdraw",
  category: string,
  amount: number,
  createAt: string
}

export type TransactionInput = Omit<Transaction, "id" | "createAt">