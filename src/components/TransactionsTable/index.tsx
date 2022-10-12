import { formatCurrency, formatDate } from "../../functions/format";
import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function TransactionsTable() {
  const { transactions } = useTransactions()

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transactions => (
            <tr key={transactions.id}>
              <td>{transactions.title}</td>
              <td className={transactions.type}>
                {formatCurrency(transactions.amount)}
              </td>
              <td>{transactions.category}</td>
              <td>
                {formatDate(new Date(transactions.amount))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}