import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { GetTransactions, PostTransaction } from "../services";
import { Transaction, TransactionInput } from "../types/transaction";

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transaction[],
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    GetTransactions()
      .then(({ transactions }) => setTransactions(transactions));
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    PostTransaction(transactionInput)
      .then(({ transaction }) => setTransactions([...transactions, transaction]));
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider >
  )
}

export function useTransactions() {
  return useContext(TransactionsContext)
}