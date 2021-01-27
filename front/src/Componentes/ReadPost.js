import { useState, useContext } from 'react'
import { LoginContext } from '../Componentes/LoginContext'
import PostComponent from './PostComponent'
import ComentarioComponent from './ComentarioComponent'
import styled from 'styled-components'

const Text = styled.textarea`
  width: calc(100% - 58px);
  height: 120px;
  margin: 0 20px;
  padding: 10px;
  font-size: 15px;
`

const NoComentario = styled.div`
  width: calc(100% - 60px);
  height: 120px;
  margin: 0 20px;
  padding: 10px;
  border-color: gray;
  border-style: solid;
  border-width: 1px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center
`

const NoComentarioText = styled.span`
  color: white;
  font-size: 22px;
  font-weight: 700;
`

const AddComentarioContainer = styled.div`
  display: flex;
  margin: 10px 20px;
  justify-content: flex-end;
`

const AddComentario = styled.button`
  border: none;
  background-color: red;
  color: white;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
`

const ReadPost = ({ post, comentarios }) => {
  const [comentario, setComentario] = useState('')
  const { usuario } = useContext(LoginContext)

  const handleComentario = (ev) => {
    setComentario(ev.currentTarget.value)
  }

  const addComentario = async() => {
    fetch(`${process.env.REACT_APP_BACK}/comentario`, {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({
        conteudo: comentario,
        usuarioId: parseInt(usuario),
        postId: parseInt(post.id)
      }),
    })
      .then(result => result.json())
      .then(() => {
        setComentario('')
      })
  }

  return (
    <>
      <PostComponent {...post} />
      <h3>Comentarios:</h3>
      <h4>Novo Comentário</h4>
      {!!usuario ? (
        <>
          <Text value={comentario} onChange={handleComentario} />
          <AddComentarioContainer>
            <AddComentario onClick={addComentario}>Adicionar Comentário</AddComentario>
          </AddComentarioContainer>
        </>
      ) : (
        <NoComentario>
          <NoComentarioText>Você precisa estar logado para poder comentar no site</NoComentarioText>
        </NoComentario>
      )}
      {comentarios.map((comentario) => (
        <ComentarioComponent {...comentario} />
      ))}
    </>
  )
}

export default ReadPost
