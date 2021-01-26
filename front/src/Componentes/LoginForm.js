import { useState } from 'react'
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

const UserForm = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const history = useHistory()

  const handleSubmit = async(ev) => {
    ev.preventDefault()
    fetch(`${process.env.REACT_APP_BACK}/login`, {
      method: 'POST',
      body: JSON.stringify({
        usuario: email,
        senha: md5(senha),
      }),
      credentials: "include",
    }).then(result => result.json())
    history.push(`/`)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <Titulo>
            Email:
          </Titulo>
          <InputTitulo type='text' value={email} onChange={(ev) => setEmail(ev.currentTarget.value)} />
        </InputWrapper>
        <InputWrapper>
          <Titulo>
            Senha:
          </Titulo>
          <InputTitulo type='password' value={senha} onChange={(ev) => setSenha(ev.currentTarget.value)} />
        </InputWrapper>
        <SubmitWrapper>
          <InputSubmit type='submit' value='Cadastrar' />
        </SubmitWrapper>
      </form>
    </>
  )
}

export default UserForm
