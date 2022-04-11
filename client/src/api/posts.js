import axios from 'axios'
// en desarrollo usamos http://localho... podemos evitar tener que 
// escribir http://localhos... en todos los lugares. Si usamos un 
// proxy en el package.json 

// getPostsRequests = () => axios.get('http://localhost:4000/api/posts')
export const getPostsRequest = async () => await axios.get('/posts')
// en producción https://localhos... se sustiurá por el dominio.

// para crear publicaciones recibe un parametro y lo envía al backend
// http://localhost:4000/api/posts/
export const createPostRequest = async (post) => {
   const form = new FormData(); //crea un formulario
   for (let key in post) {   // recorre las propiedades(campos) del post del formulario
     form.append(key, post[key]);  // añade al formulario con los valores de sus propiedad
   }
   return await axios.post("/posts", form, {
     headers: {
       "Content-Type": "multipart/form-data",
     },
   });
 };

// hace una petición delete concatenado con el id que quiere borrar
// http://localhost:4000/api/posts/:id
export const deletePostRequest = async (id) => await axios.delete('/posts/' + id)

// hace una petición delete concatenado con el id que quiere traer 
// http://localhost:4000/api/posts/:id
export const getPostRequest = async (id) => await axios.get('/posts/' + id)

// recibe el id con los nuevos datos del post que quiero actualizar, hace una petición 
// put al backend con los datos. 
// http://localhost:4000/api/posts/:id
export const updatePostRequest = async (id, newFields) => await axios.put(`/posts/${id}`, newFields)