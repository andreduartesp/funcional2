import { createContext, useState } from 'react'

export const LoginContext = createContext({})

export default ({ children }) => {
  const [usuario, setUsuario] = useState(null)
  const [editor, setEditor] = useState(null)

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
