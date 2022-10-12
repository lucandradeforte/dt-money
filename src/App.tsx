import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransanctionModal } from "./components/NewTransactionModal";
import { GlobalStyles } from "./styles/global";
import { TransactionsProvider } from "./hooks/useTransactions";

export function App() {
  const [
    isNewTransactionModalOpen, setIsNewTransactionModalOpen
  ] = useState(false)

  function handleOpenNewTransanctionModal() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransanctionModal() {
    setIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransanctionModal={handleOpenNewTransanctionModal} />
      <Dashboard />

      <NewTransanctionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransanctionModal}
      />

      <GlobalStyles />
    </TransactionsProvider>
  );
}
