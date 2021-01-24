import styled from 'styled-components'

const Container = styled.div`
	background-color: red;
	position: fixed;
	text-align: center;
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`

const FakeContainer = styled.div`
	height: 80px;
`

const Titulo = styled.h1`
	text-align: center;
	margin: 0 auto;
	color: white;
`

const Header = () => {
  return (
		<>
			<Container>
				<Titulo>Bem Vindo ao Blog</Titulo>
			</Container>
			<FakeContainer/>
		</>
  )
}

export default Header
