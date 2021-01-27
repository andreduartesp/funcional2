import styled from 'styled-components'

const Container = styled.div`
  text-align: left;
  margin: 30px 20px;
  text-decoration: none;
  color: black;
`

const Titulo = styled.h2`
`

const Autor = styled.h3`
`

const Conteudo = styled.p`
  text-indent: 17px;
  font-size: 19px;
`

const LerMais = styled.span`
  color: red;
`

const replaceNewLine = (texto) => `<p>${texto.split("\n").join("</p><p>")}</p>`

const PostComponent = ({ titulo, editor, conteudo, lista }) => {
  if (lista) {
    conteudo = `${conteudo.substring(0, 400)} …`
  }

  return (
    <Container>
      <Titulo>{titulo}</Titulo>
      <Autor>Por: {editor.nome}</Autor>
      <div>
        <Conteudo dangerouslySetInnerHTML={{__html: replaceNewLine(conteudo)}} />
      </div>
      {lista && <LerMais>{"Continue Lendo >"}</LerMais>}
    </Container>
  )
}

export default PostComponent
