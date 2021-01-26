import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { LoginContext } from '../Componentes/LoginContext'
import { useParams } from 'react-router-dom'
import ReadPost from '../Componentes/ReadPost'
import EditPost from '../Componentes/EditPost'
import Header from '../Componentes/Header'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const Container = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`

const SwitchButton = styled.button`
  border: none;
  background-color: red;
  color: white;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
  position: absolute;
  top: 100px;
  right: 30px;
`

const DenyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: cente;
  flex: 1;
`

const DenyText = styled(Link)`
  color: red;
  font-size: 30px;
  text-decoration: none;
`

const Post = () => {
  const { id } = useParams()
  const [editMode, setEditMode] = useState(false)
  const [comentarios, setComentarios] = useState([])
  const [post, setPost] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { editor } = useContext(LoginContext)
  const [deny, setDeny] = useState(false)

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
    } else if (editor) {
      setEditMode(true)
      setIsLoading(false)
    } else {
      setDeny(true)
      setIsLoading(false)
    }
  }, [id])

  if (isLoading) {
    return <div></div>
  }

  if (deny) {
    return (
      <DenyContainer>
        <DenyText to={'/editor/add'}>
          {'Você precisa ser um editor pra acessar essa pagina, clique aqui para adicionar um editor'}
        </DenyText>
      </DenyContainer>
    )
  }

  const mudar = () => {
    if(editMode) {
      setEditMode(false)
    } else {
      setEditMode(true)
    }
  }

  return (
    <>
      <Header />
      <Container>
        {editor && <SwitchButton onClick={mudar}>{editMode? 'Visualizar' : 'Editar'}</SwitchButton>}
        {(editMode ?
          <EditPost post={post} /> :
          <ReadPost post={post} comentarios={comentarios} />
        )}
      </Container>
    </>
  )
}

export default Post
