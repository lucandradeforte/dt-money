import { api } from "./api"
import { TransactionInput } from "../types/transaction"

export async function GetTransactions() {
  const { data } = await api.get("transactions")
  return data
}

export async function PostTransaction(transactionInput: TransactionInput) {
  const { data } = await api.post("transactions", transactionInput)
  return data
}