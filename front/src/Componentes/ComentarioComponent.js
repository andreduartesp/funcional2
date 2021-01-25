import styled from 'styled-components'

const Container = styled.div`
  border-color: gray;
  border-width: 1px;
  border-style: solid;
  margin: 20px;
  padding: 20px;
  background-color: #f7f7f7;
`

const Conteudo = styled.p`
  font-size: 20px;
`

const Autor = styled.span`
  font-size: 12px;
  font-weight: 700;
`

const ComentarioComponent = ({ conteudo, usuario }) => {
  return (
    <Container>
      <Conteudo>{conteudo}</Conteudo>
      <Autor>{usuario.nome}</Autor>
    </Container>
  )
}

export default ComentarioComponent
