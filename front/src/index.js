import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ListaPosts from './Paginas/ListaPosts'
import Post from './Paginas/Post'
import Usuarios from './Paginas/Usuarios'
import Editor from './Paginas/Editor'
import Login from './Paginas/Login'
import LoginEditor from './Paginas/LoginEditor'
import Header from './Componentes/Header'
import LoginContextProvider from './Componentes/LoginContext'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <LoginContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={ListaPosts} />
          <Route path="/post/:id" exact={true} component={Post} />
          <Route path="/post/" exact={true} component={Post} />
          <Route path="/editor/:id" exact={true} component={Editor} />
          <Route path="/editor/" exact={true} component={LoginEditor} />
          <Route path="/cadastrar" exact={true} component={Usuarios} />
          <Route path="/perfil/:id" exact={true} component={Usuarios} />
          <Route path="/login" exact={true} component={Login} />
        </Switch>
      </BrowserRouter>
    </LoginContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
