import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import ReadPost from '../Componentes/ReadPost'
import EditPost from '../Componentes/EditPost'

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
  const [editMode, setEditMode] = useState(false)
  const [post, setPost] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async() => {
    const post = await fetch(`http://localhost:8080/post/${id}`).then(response => response.json())
    setPost(post)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div></div>
  }

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
