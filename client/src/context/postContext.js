import { useState, createContext, useContext, useEffect } from 'react'
import { getPostsRequest, createPostRequest, 
  deletePostRequest, getPostRequest, updatePostRequest } from '../api/posts.js'

// crea el context y se guarda en una variable
const postContext = createContext()

// usa el context, lo guarda y lo exporta en una función para
// evitar que los demás componentes importen el useContext()
export const usePostsContext = () => {
    const context = useContext(postContext)
    return context
}

// lógica del contexto
export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    // console.log(posts)

    useEffect(() => {
      (async () => {
        const res = await getPostsRequest();
        setPosts(res.data);
      })();
    }, []);

    // trae los posts desde el backend
    const getPosts = async () => {
      const res = await getPostsRequest()
      console.log(res)     
      // en data viene el array
      setPosts(res.data) 
    }

    const createPost = async (post) => {
      try {
        const res = await createPostRequest(post)
        setPosts([...posts, res.data])
      // añade la nueva publicación a las ya existentes
      // traidas con el spread Operator [...]
      } catch (error) {
        console.error(error)
      }
    }

    const deletePost = async (id) => {
      try {
        const res = await deletePostRequest(id)
        if(res.status === 200) {
          setPosts(posts.filter((post) => post._id !==id)) }
          // post._id es el post de la publicaciones lo compara
          // con el id que se guardo como id y lo recibe como parametro
      } catch (error) {
        console.error(error)
      }
    }

    const getPost = async (id) => {
      const res = await getPostRequest(id)
      return res.data
      // console.log(res)
      // console.log(res.data)
    }

    const updatePost = async (id, post) => {
      const res = await updatePostRequest(id, post)
      setPosts(posts.map((post => post.id === id ? res.data: post)))
      // recorre los posts y si el id recibido coincide con el post_id 
      // se actualiza el dato y se muestra. Sino se muestra lo anterior. 
    }

  return (
    // devuelve un objeto
    <postContext.Provider value= {{ 
        posts,
        getPosts,
        createPost,
        deletePost,
        getPost,
        updatePost
    }}>
        { children }
    </postContext.Provider>
        
  )
}
