import { useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import ReadPost from '../Componentes/ReadPost'
import EditPost from '../Componentes/EditPost'

const post = {
  id: 1,
  titulo: "Teste de post 1",
  conteudo: `
    No mundo atual, a percepção das dificuldades estende o alcance e a importância do sistema de formação de quadros que corresponde às necessidades.
    Neste sentido, o novo modelo estrutural aqui preconizado promove a alavancagem das regras de conduta normativas.
    Não obstante, a consulta aos diversos militantes nos obriga à análise dos modos de operação convencionais.
    O incentivo ao avanço tecnológico, assim como o entendimento das metas propostas agrega valor ao estabelecimento dos conhecimentos estratégicos para atingir a excelência.
    Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se o desafiador cenário globalizado promove a alavancagem dos métodos utilizados na avaliação de resultados.
  `,
  autor: "Nome do autor",
}

const comentarios = [
  {
    conteudo: "conteudo de um comentario mega importante pro blog",
    usuario: {
      nome: "Nome do usuario"
    },
  },
  {
    conteudo: "conteudo de um comentario mega importante pro blog",
    usuario: {
      nome: "Nome do usuario"
    },
  },
  {
    conteudo: "conteudo de um comentario mega importante pro blog",
    usuario: {
      nome: "Nome do usuario"
    },
  },
  {
    conteudo: "conteudo de um comentario mega importante pro blog",
    usuario: {
      nome: "Nome do usuario"
    },
  },
  {
    conteudo: "conteudo de um comentario mega importante pro blog",
    usuario: {
      nome: "Nome do usuario"
    },
  },
]

const Container = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`

const Post = () => {
  const { id } = useParams()
  const [editMode, setEditMode] = useState(true)
  return (
    <Container>
      {(editMode ?
        <EditPost post={post} /> :
        <ReadPost post={post} comentarios={comentarios} />
      )}
    </Container>
  )
}

export default Post
