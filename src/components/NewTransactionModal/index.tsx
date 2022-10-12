import { FormEvent, useState } from "react"
import Modal from "react-modal"
import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomImg from "../../assets/outcome.svg"
import { useTransactions } from "../../hooks/useTransactions"
import { TransactionInput } from "../../types/transaction"
import { Container, RadioBox, TransactionTypeContainer } from "./styles"

Modal.setAppElement("#root")

interface NewTransanctionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function NewTransanctionModal({
  isOpen,
  onRequestClose
}: NewTransanctionModalProps) {
  const { createTransaction } = useTransactions()

  const defaultFormData = { type: "deposit" } as TransactionInput
  const [formData, setFormData] = useState<TransactionInput>(defaultFormData)

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    createTransaction(formData)
      .then(() => {
        setFormData(defaultFormData)
        onRequestClose()
      });
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={() => {
          setFormData(defaultFormData)
          onRequestClose()
        }}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar trasação</h2>

        <input
          placeholder="Título"
          value={formData.title ?? ""}
          onChange={event => setFormData({
            ...formData, title: event.target.value
          })}
          required
        />

        <input
          type="number"
          placeholder="Valor"
          value={formData.amount ?? ""}
          onChange={event => setFormData({
            ...formData, amount: Number(event.target.value)
          })}
          min="0"
          step="0.01"
          required
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setFormData({
              ...formData, type: "deposit"
            })}
            isActive={formData.type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setFormData({
              ...formData, type: "withdraw"
            })}
            isActive={formData.type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={formData.category ?? ""}
          onChange={event => setFormData({
            ...formData, category: event.target.value
          })}
          required
        />

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}