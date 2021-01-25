import { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

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
  const history = useHistory()

  const handleSubmit = async(ev) => {
    ev.preventDefault()
    if (editor.id) {
      fetch(`${process.env.REACT_APP_BACK}/editor/${editor.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          nome,
        })
      }).then(result => result.json())
    } else {
      const newId = await fetch(`${process.env.REACT_APP_BACK}/editor`, {
        method: 'POST',
        body: JSON.stringify({
          nome,
        })
      }).then(result => result.json())
      history.push(`/editor/${newId.id}`)
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
        <SubmitWrapper>
          <InputSubmit type='submit' value='Enviar Post' />
        </SubmitWrapper>
      </form>
    </>
  )
}

export default EditPost
