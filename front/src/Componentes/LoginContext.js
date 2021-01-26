import { createContext, useEffect, useState } from 'react'

export const LoginContext = createContext({})

export default ({ children }) => {
  const [usuario, setUsuarioVal] = useState(null)
  const [editor, setEditorVal] = useState(null)

  useEffect(() => {
    const usuario = localStorage.getItem("usuario")
    const editor = localStorage.getItem("editor")
    if (usuario) {
      setUsuarioVal(parseInt(usuario))
    }

    if (editor) {
      setEditorVal(parseInt(editor))
    }
  })

  const setUsuario = (usuario) => {
    setUsuarioVal(usuario)
    localStorage.setItem('usuario', usuario)
  }

  const setEditor = (editor) => {
    setEditorVal(editor)
    localStorage.setItem('editor', editor)
  }

  const value = {
    usuario,
    setUsuario,
    editor,
    setEditor,
  }
  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  )
}
