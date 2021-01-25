import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ListaPosts from './Paginas/ListaPosts'
import Post from './Paginas/Post'
import Usuarios from './Paginas/Usuarios'
import Header from './Componentes/Header'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={ListaPosts} />
        <Route path="/post/:id" exact={true} component={Post} />
        <Route path="/post/" exact={true} component={Post} />
        <Route path="/usuarios" exact={true} component={Usuarios} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
