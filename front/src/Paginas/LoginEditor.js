import { useState, useEffect } from 'react'
import styled from 'styled-components'
import LoginForm from '../Componentes/LoginForm'

const Container = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`

const HeaderContainer = styled.div`
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

const LoginEditor = () => {
  return (
    <>
      <HeaderContainer>
        <Titulo>Editor Login</Titulo>
      </HeaderContainer>
      <FakeContainer></FakeContainer>
      <Container>
        <LoginForm />
      </Container>
    </>
  )
}

export default LoginEditor
