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
`

const BotoesContainer = styled.div`
  position: absolut;
  right: 0;
  margin: 0 20px;
`

const StyledLink = styled(Link)`
  color: white;
  font-weight: 700;
  text-decoration: none;
  padding: 10px;
`

const Header = () => {
  const { usuario } = useContext(LoginContext)

  const logout = async() => {}

  return (
    <>
      <Container>
        <Titulo>Bem Vindo ao Blog</Titulo>
        <BotoesContainer>
          {usuario ? (
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
