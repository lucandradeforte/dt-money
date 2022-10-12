import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transaction[],
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

interface Transaction {
  id: number,
  title: string,
  type: string,
  category: string,
  amount: number,
  createAt: string
}

type TransactionInput = Omit<Transaction, "id" | "createAt">

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get("transactions")
      .then(response => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(TransactionInput: TransactionInput) {
    const response = await api.post("transactions", {
      ...TransactionInput, createAt: new Date()
    })
    const { transaction } = response.data

    setTransactions([
      ...transactions,
      transaction
    ])
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