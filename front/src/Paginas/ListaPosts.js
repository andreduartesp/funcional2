import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PostComponent from '../Componentes/PostComponent'

const Container = styled.div`
  margin: 20px;
  margin: 0 auto;
  max-width: 1024px;
`

const PostContainer = styled(Link)`
  text-align: left;
  margin: 30px 20px;
  text-decoration: none;
  color: black;
`

const ListaPosts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    console.log('start fetch')
    fetch(`${process.env.REACT_APP_BACK}/posts`, {})
      .then(result => result.json())
      .then(resultJson => setPosts(resultJson.results))
  }, [])

  return (
    <Container>
      {posts.map((post) => (
        <PostContainer to={`post/${post.id}`}>
          <PostComponent {...post} key={post.id} lista />
        </PostContainer>
      ))}
    </Container>
  )
}

export default ListaPosts
