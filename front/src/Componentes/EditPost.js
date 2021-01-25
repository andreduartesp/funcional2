import { useState } from 'react'
import styled from 'styled-components'

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
  console.log(post)
  const [conteudo, setConteudo] = useState(post.conteudo)
  const [titulo, setTiulo] = useState(post.titulo)

  const handleSubmit = (ev) => {
    ev.preventDefault()
    fetch(`${process.env.REACT_APP_BACK}/post/${post.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        conteudo,
        titulo,
        editorId: 1,
      })
    }).then(result => result.json())
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <Titulo>
            Titulo:
          </Titulo>
          <InputTitulo type='text' value={titulo} onChange={(ev) => setTiulo(ev.currentTarget.value)} />
        </InputWrapper>
        <InputWrapper>
          <Titulo>
            Conteudo:
          </Titulo>
          <InputConteudo type='text' value={conteudo} onChange={(ev) => setConteudo(ev.currentTarget.value)} />
        </InputWrapper>
        <SubmitWrapper>
          <InputSubmit type='submit' value='Enviar Post' />
        </SubmitWrapper>
      </form>
    </>
  )
}

export default EditPost
