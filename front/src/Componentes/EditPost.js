import { useState, useContext } from 'react'
import { LoginContext } from '../Componentes/LoginContext'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const InputWrapper = styled.div`

`

const Titulo = styled.h4`

`

const InputTitulo = styled.input`
  font-size: 20px;
  width: calc(100% - 20px);
  padding: 10px;
`

const InputConteudo = styled.textarea`
  width: calc(100% - 20px);
  height: 500px;
  font-size: 18px;
  padding: 10px;
`

const InputSubmit = styled.input`
  border: none;
  background-color: red;
  color: white;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
`

const SubmitWrapper = styled.div`
  display: flex;
  margin: 10px 0;
  justify-content: flex-end;
`

const EditPost = ({ post }) => {
  const [conteudo, setConteudo] = useState(post.conteudo || "")
  const [titulo, setTiulo] = useState(post.titulo || "")
  const history = useHistory()
  const { editor } = useContext(LoginContext)

  const handleSubmit = async(ev) => {
    ev.preventDefault()
    if (post.id) {
      fetch(`${process.env.REACT_APP_BACK}/post/${post.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          conteudo,
          titulo,
          editorId: editor,
        }),
      }).then(result => result.json())
    } else {
      const newId = await fetch(`${process.env.REACT_APP_BACK}/post`, {
        method: 'POST',
        body: JSON.stringify({
          conteudo,
          titulo,
          editorId: editor,
        }),
      }).then(result => result.json())
      history.push(`/post/${newId.id}`)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <Titulo>
            Titulo:
          </Titulo>
          <InputTitulo type='text' value={titulo} onChange={(ev) => setTiulo(ev.currentTarget.value)} required/>
        </InputWrapper>
        <InputWrapper>
          <Titulo>
            Conteudo:
          </Titulo>
          <InputConteudo type='text' value={conteudo} onChange={(ev) => setConteudo(ev.currentTarget.value)} required/>
        </InputWrapper>
        <SubmitWrapper>
          <InputSubmit type='submit' value='Enviar Post' />
        </SubmitWrapper>
      </form>
    </>
  )
}

export default EditPost
