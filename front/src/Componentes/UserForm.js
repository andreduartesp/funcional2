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

const UserForm = ({ usuario }) => {
  const [nome, setNome] = useState(usuario.nome || "")
  const [email, setEmail] = useState(usuario.usuario || "")
  const [senha, setSenha] = useState(usuario.id ? "******" : "")
  const [confirmacao, setConfirmacao] = useState(usuario.id ? "******" : "")
  const history = useHistory()

  const handleSubmit = async(ev) => {
    ev.preventDefault()
    if (usuario.id) {
      fetch(`${process.env.REACT_APP_BACK}/atualizar/${usuario.id}`, {
        method: 'POST',
        body: JSON.stringify({
          nome,
          usuario: email,
          senha: senha === '"******' ? senha : md5(senha),
        })
      }).then(result => result.json())
    } else {
      const newId = await fetch(`${process.env.REACT_APP_BACK}/cadastrar`, {
        method: 'POST',
        body: JSON.stringify({
          nome,
          usuario: email,
          senha: md5(senha),
        })
      }).then(result => result.json())
      history.push(`/`)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <Titulo>
            Nome:
          </Titulo>
          <InputTitulo type='text' value={nome} onChange={(ev) => setNome(ev.currentTarget.value)} />
        </InputWrapper>
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
        <InputWrapper>
          <Titulo>
            Confirmação da Senha:
          </Titulo>
          <InputTitulo type='password' value={confirmacao} onChange={(ev) => setConfirmacao(ev.currentTarget.value)} />
        </InputWrapper>
        <SubmitWrapper>
          <InputSubmit type='submit' value='Cadastrar' />
        </SubmitWrapper>
      </form>
    </>
  )
}

export default UserForm