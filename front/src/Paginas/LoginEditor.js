import { useState, useEffect } from 'react'
import styled from 'styled-components'
import LoginForm from '../Componentes/LoginForm'

const Container = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`

const LoginEditor = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  )
}

export default LoginEditor
