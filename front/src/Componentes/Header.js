import { useContext } from 'react'
import styled from 'styled-components'
import { LoginContext } from '../Componentes/LoginContext'
import { Link } from 'react-router-dom'

const Container = styled.div`
  background-color: red;
  position: fixed;
  text-align: center;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const FakeContainer = styled.div`
  height: 80px;
`

const Titulo = styled.h1`
  text-align: center;
  margin: 0 auto;
  color: white;
  text-decoration: none;
`

const BotoesContainer = styled.div`
  position: absolute;
  right: 0;
  margin: 0 20px;
`

const StyledLink = styled(Link)`
  color: white;
  font-weight: 700;post/21
  text-decoration: none;
  padding: 10px;
`

const TitleLink = styled(Link)`
  text-decoration: none;
`

const Header = () => {
  const { usuario, setUsuario } = useContext(LoginContext)

  const logout = async() => {
    setUsuario(null)
  }
  return (
    <>
      <Container>
        <TitleLink to='/'>
          <Titulo>Bem Vindo ao Blog</Titulo>
        </TitleLink>
        <BotoesContainer>
          {!!usuario ? (
            <StyledLink onClick={logout}>SAIR</StyledLink>
          ) : (
            <>
              <StyledLink to={'/login'}>ENTRAR</StyledLink>
              <StyledLink to={'/cadastrar'}>CADASTRAR</StyledLink>
            </>
          )}
        </BotoesContainer>
      </Container>
      <FakeContainer/>
    </>
  )
}

export default Header
