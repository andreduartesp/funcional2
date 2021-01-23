import logo from './logo.svg'
import styled, { keyframes } from 'styled-components'

const appLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
 

const AppStyled = styled.div`
  text-align: center;
`

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const Logo = styled.img`
  height: 40vmin;
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: ${appLogoSpin} infinite 20s linear;
    }
  }
`

const Link = styled.a`
  color: #61dafb;
`

function App() {
  return (
    <AppStyled>
      <Header>
        <Logo src={logo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </Header>
    </AppStyled>
  )
}

export default App
