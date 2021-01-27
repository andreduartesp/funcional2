import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import UserForm from '../Componentes/UserForm'

const Container = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`

const Usuarios = () => {
  const { id } = useParams()
  const [usuario, setUsuario] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async() => {
    if (id) {
      const usuario = await fetch(`${process.env.REACT_APP_BACK}/usuario/${id}`, {mode: 'cors',}).then(response => response.json())
      setUsuario({ ...usuario, id })
    }
    setIsLoading(false)
  }, [id])

  if (isLoading) {
    return <div></div>
  }

  return (
    <Container>
      <UserForm usuario={usuario} />
    </Container>
  )
}

export default Usuarios
