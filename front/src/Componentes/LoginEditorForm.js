import { useState, useContext } from 'react'
import { LoginContext } from '../Componentes/LoginContext'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import md5 from 'md5'
import { Link } from 'react-router-dom'

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


const LinkButton = styled(Link)`
  border: none;
  background-color: red;
  color: white;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
  text-decoration: none;
  margin-left: 10px;
`

const LoginEditor = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erroLogin, setErroLogin] = useState(false)
  const history = useHistory()
  const { setEditor } = useContext(LoginContext)

  const handleSubmit = async(ev) => {
    ev.preventDefault()
    fetch(`${process.env.REACT_APP_BACK}/editorLogin/${email}/${md5(senha)}`, {
      method: 'POST',
    })
      .then(result => result.json())
      .then((usuario) => {
        console.log(usuario)
        if (usuario.results[0]){
          setEditor(usuario.results[0])
          history.push('/post')
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
          <LinkButton to='/editor/add' >Adicionar Editor</LinkButton>
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

export default LoginEditor
