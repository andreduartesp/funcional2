import { useState, useContext } from 'react'
import { LoginContext } from '../Componentes/LoginContext'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import md5 from 'md5'

const InputWrapper = styled.div``

const Titulo = styled.h4``

const InputTitulo = styled.input`
  font-size: 20px;
  width: calc(100% - 20px);
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

const EditPost = ({ editor }) => {
  const [nome, setNome] = useState(editor.nome || "")
  const [email, setEmail] = useState(editor.nome || "")
  const [senha, setSenha] = useState(editor.nome || "")
  const history = useHistory()
  const { setEditor } = useContext(LoginContext)

  const handleSubmit = async(ev) => {
    ev.preventDefault()
    if (editor.id) {
      fetch(`${process.env.REACT_APP_BACK}/editor/${editor.id}`, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify({
          nome,
          email,
          senha: md5(senha),
        }),
      }).then(result => result.json())
    } else {
      const newId = await fetch(`${process.env.REACT_APP_BACK}/editor`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          nome,
          email,
          senha: md5(senha),
        }),
      }).then(result => result.json())
      setEditor(newId.id)
      history.push('/post')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <Titulo>
            Nome:
          </Titulo>
          <InputTitulo type='text' value={nome} onChange={(ev) => setNome(ev.currentTarget.value)} required/>
        </InputWrapper>
        <InputWrapper>
          <Titulo>
            Email:
          </Titulo>
          <InputTitulo type='text' value={email} onChange={(ev) => setEmail(ev.currentTarget.value)} required/>
        </InputWrapper>
        <InputWrapper>
          <Titulo>
            Senha:
          </Titulo>
          <InputTitulo type='text' value={senha} onChange={(ev) => setSenha(ev.currentTarget.value)} required/>
        </InputWrapper>
        <SubmitWrapper>
          <InputSubmit type='submit' value='Enviar Post' />
        </SubmitWrapper>
      </form>
    </>
  )
}

export default EditPost
