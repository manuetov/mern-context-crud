import {Router} from 'express'
import {getPosts, createPost, 
    updatePost, deletePost, getPost } 
    from '../controllers/postsControllers.js'

const router = Router()

// pide todas. http://localhost:3000/posts 
router.get('/posts', getPosts)

// pide una. http://localhost:3000/posts/:5 
router.get('/posts/:id', getPost)

// crea. 
router.post('/posts', createPost)

// actualiza. 
router.put('/posts/:id', updatePost)

// borra.
router.delete('/posts/:id', deletePost)



export default router // se exporta a index.js