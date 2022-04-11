import toast from 'react-hot-toast'
import { usePostsContext } from '../context/postContext.js'
import { useNavigate } from 'react-router-dom'

export function PostCard({ post }) {

  const { deletePost } = usePostsContext ()
  const navigate = useNavigate()
  

  const handleDelete = (id) => {
    toast(
      (t) => (
      <div className="text-center">
        <p className="text-xl text-white px-3 py-2">Confirmar borrado {id} </p>
        <div>
          <button className="bg-red-400 hover:bg-red-600 px-3 py-2 
          text-white rounded-sm mx-2" onClick={(e) => {
            deletePost(id);
            toast.dismiss(t.id) //id de la notificación
            }}
          >
            Borrrar
          </button>
          <button className='bg-slate-400 hover:bg-slate-600 px-3 py-2
          text-white rounded-sm mx-2'
          onClick={() => toast.dismiss(t.id)} > 
          {/** hace desaparecer el modal después del click */}
          Cancelar
          </button>
        </div>
      </div>
    ), {
      style: {
        background: '#202020'
      }
    })

  }

  return (
    <div
      className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black
    hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => navigate(`/posts/${post._id}`)}
      // cuanto den un click redireccion a la ruta 
      // <Route path='/posts/:id' element={ <PostForm /> } />
      // con el id del post donde se muestra el formulario
    >
      <div className="px-4 py-7">
        <div className="flex justify-between">
          <h3>{post.title}</h3>
          <button className="bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm"
            onClick={(e) => {
              e.stopPropagation() // evita que redireccione
              handleDelete(post._id)}} //recibe el _id de cada post
          >
            Borrar
          </button>
        </div>
        <p>{post.description}</p>
        {/* si el post trae una imagen la muestra */}
        {post.image && <img src={post.image.url} />}
      </div>
    </div>
  );
}
