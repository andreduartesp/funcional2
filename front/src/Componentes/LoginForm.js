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

const ErroContainer = styled.div`

`

const ErroSpan = styled.span`

`

const UserForm = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erroLogin, setErroLogin] = useState(false)
  const history = useHistory()
  const { setUsuario } = useContext(LoginContext)

  const handleSubmit = async(ev) => {
    ev.preventDefault()
    fetch(`${process.env.REACT_APP_BACK}/login/${email}/${md5(senha)}`, {
      method: 'POST',
      mode: 'cors',
    })
      .then(result => result.json())
      .then((usuario) => {
        console.log(usuario)
        if (usuario.results[0]){
          setUsuario(usuario.results[0])
          history.push(`/`)
        } else {
          setErroLogin(true)
        }
      }).catch(e => {
        setErroLogin(true)
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          <InputTitulo type='password' value={senha} onChange={(ev) => setSenha(ev.currentTarget.value)} required/>
        </InputWrapper>
        <SubmitWrapper>
          <InputSubmit type='submit' value='Entrar' />
        </SubmitWrapper>
      </form>
      {erroLogin && (
        <ErroContainer>
          <ErroSpan>Email ou senha inválido</ErroSpan>
        </ErroContainer>
      )}
    </>
  )
}

export default UserForm
