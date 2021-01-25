import { useState } from 'react'
import styled from 'styled-components'

const EditPost = ({ conteudo, id, titulo }) => {
  const [conteudoLocal, setConteudoLocal] = useState(conteudo)
  const [tituloLocal, settiTuloLocal] = useState(titulo)
  const [idLocal, setIdLocal] = useState(id)

  const handleSubmit = (test) => {
    console.log(test)
  }

  const inputChange = (ev) => {
    console.log(ev.currentTarget.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Conteudo:
          <input type="text" value={tituloLocal} onChange={inputChange} />
        </label>
      </form>
    </>
  )
}

export default EditPost
