import PostComponent from './PostComponent'
import ComentarioComponent from './ComentarioComponent'

const ReadPost = ({ post, comentarios }) => {
  return (
    <>
      <PostComponent {...post} />
      <span>Comentarios:</span>
      {comentarios.map((comentario) => (
        <ComentarioComponent {...comentario} />
      ))}
    </>
  )
}

export default ReadPost
