import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PostComponent from '../Componentes/PostComponent'

const conteudo = `
    No mundo atual, a percepção das dificuldades estende o alcance e a importância do sistema de formação de quadros que corresponde às necessidades.
    Neste sentido, o novo modelo estrutural aqui preconizado promove a alavancagem das regras de conduta normativas.
    Não obstante, a consulta aos diversos militantes nos obriga à análise dos modos de operação convencionais.
    O incentivo ao avanço tecnológico, assim como o entendimento das metas propostas agrega valor ao estabelecimento dos conhecimentos estratégicos para atingir a excelência.
    Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se o desafiador cenário globalizado promove a alavancagem dos métodos utilizados na avaliação de resultados.
  `

const posts = [
  {
    id: 1,
    titulo: "Teste de post 1",
    autor: "Nome do autor",
    conteudo,
  },
  {
    id: 2,
    titulo: "Teste de post 1",
    autor: "Nome do autor",
    conteudo,
  },
  {
    id: 3,
    titulo: "Teste de post 1",
    autor: "Nome do autor",
    conteudo,
  },
  {
    id: 4,
    titulo: "Teste de post 1",
    conteudo: "Aqui vai o conteudo do primeiro post jamais publicado nesse site, ele deve conter a estrutura bizarra de um post completo",
    autor: "Nome do autor",
  },
]

const Container = styled.div`
  margin: 20px;
  margin: 0 auto;
  max-width: 1024px;
`

const PostContainer = styled(Link)`
  text-align: left;
  margin: 30px 20px;
  text-decoration: none;
  color: black;
`

const ListaPosts = () => {
  return (
    <Container>
      {posts.map((post) => (
        <PostContainer to={`post/${post.id}`}>
          <PostComponent {...post} key={post.id} lista />
        </PostContainer>
      ))}
    </Container>
  )
}

export default ListaPosts
