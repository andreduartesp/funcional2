import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import EditorForm from '../Componentes/EditorForm'

const Container = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`

const Post = () => {
  const { id } = useParams()
  const [editor, setEditor] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async() => {
    if (id) {
      const editor = await fetch(`${process.env.REACT_APP_BACK}/editor/${id}`, {credentials: "include"}).then(response => response.json())
      setEditor({ ...editor, id })
    }
    setIsLoading(false)
  }, [id])

  if (isLoading) {
    return <div></div>
  }

  return (
    <Container>
      <EditorForm editor={editor} />
    </Container>
  )
}

export default Post
