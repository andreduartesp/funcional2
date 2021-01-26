import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import ReadPost from '../Componentes/ReadPost'
import EditPost from '../Componentes/EditPost'
import Header from '../Componentes/Header'

const Container = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`

const Post = () => {
  const { id } = useParams()
  const [editMode, setEditMode] = useState(false)
  const [comentarios, setComentarios] = useState([])
  const [post, setPost] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_BACK}/post/${id}`, {credentials: "include"})
        .then(response => response.json())
        .then(post => {
          setPost({ ...post, id })
          setIsLoading(false)
        })
      fetch(`${process.env.REACT_APP_BACK}/comentarios/${id}`, {credentials: "include"})
        .then(response => response.json())
        .then(comentarios => setComentarios(comentarios.results))
    }
  }, [id])

  if (isLoading) {
    return <div></div>
  }

  return (
    <>
      <Header />
      <Container>
        {(editMode ?
          <EditPost post={post} /> :
          <ReadPost post={post} comentarios={comentarios} />
        )}
      </Container>
    </>
  )
}

export default Post
