import { useState } from 'react'
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

  const handleComentario = (ev) => {
    setComentario(ev.currentTarget.value)
  }

  const addComentario = async() => {
    const retorn = fetch(`${process.env.REACT_APP_BACK}/comentario`, {
      method: 'post',
      body: JSON.stringify({
        conteudo: comentario,
        usuarioId: 1,
        postId: 1
      })
    }).then(result => result.json())
    console.log(retorn)
    setComentario('')
  }

  return (
    <>
      <PostComponent {...post} />
      <h3>Comentarios:</h3>
      <h4>Novo Comentário</h4>
      <Text value={comentario} onChange={handleComentario} />
      <AddComentarioContainer>
        <AddComentario onClick={addComentario}>Adicionar Comentário</AddComentario>
      </AddComentarioContainer>
      {comentarios.map((comentario) => (
        <ComentarioComponent {...comentario} />
      ))}
    </>
  )
}

export default ReadPost
