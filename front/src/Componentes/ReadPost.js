import PostComponent from './PostComponent'
import ComentarioComponent from './ComentarioComponent'

const ReadPost = ({ post, comentarios }) => {
  return (
    <>
      <PostComponent {...post} />
      <h3>Comentarios:</h3>
      {comentarios.map((comentario) => (
        <ComentarioComponent {...comentario} />
      ))}
    </>
  )
}

export default ReadPost
