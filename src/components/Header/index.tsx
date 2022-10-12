import logoImg from "../../assets/logo.svg"
import { Container, Content } from "./styles"

interface HeaderProps {
  onOpenNewTransanctionModal: () => void
}

export function Header({ onOpenNewTransanctionModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={onOpenNewTransanctionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  )
}