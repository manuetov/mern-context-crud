import PostSchema from '../models/postModel.js'
import { uploadImage, deleteImage} from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const getPosts = async (req, res) => {
    try {
      const posts = await PostSchema.find({});
      return res.json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message })
    }
  };

export const createPost = async (req, res) => {
    try {
        const { title, description } = req.body
        console.log(req.files)
        
        let image = null; // variable donde se guardará la propiedad url y public_id
       
        // ? por si el req.files no tiene imagen
        if (req.files?.image){
            const result = await uploadImage(req.files.image.tempFilePath)
            console.log(result)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
            await fs.remove(req.files.image.tempFilePath) 
            // elimina el archivo del server despues de subirlo a cloudinary
        } 
        const newPost = new PostSchema({title, description, image})

        await newPost.save() // metodo para guardar en la bbdd
        // console.log(req.body)

        return res.json(newPost) //responde con el json
    } catch (error){
      console.error(error);
      return res.status(500).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    try {
        // console.log(req.params)
        const { id } = req.params
        const updatePost = await PostSchema.findByIdAndUpdate(id, 
            { $set: req.body },  
            { new: true }) // news: true => devuelve el dato actualizado 
        // metodo para buscar un id y devuelve los datos asociados (req.body)
        console.log(updatePost) 
        return res.json(updatePost)
    } catch (error){
        console.error(error);
        return res.status(500).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const postRemoved = await PostSchema.findByIdAndDelete(id)
        // const postRemoved = await PostSchema.findByIdAndDelete(req.params.id)
        
        // si el post lleva imagen la eliminara
        if (postRemoved && postRemoved.image.public_id){
            await deleteImage(postRemoved.image.public_id)
        }
        if (!postRemoved) return res.sendStatus(404) //si postRemoved no existe => envia 404
        res.sendStatus(204) // sino envia un 204 y mensaje json

    } catch (error){
        console.error(error);
        return res.status(500).json({ message: error.message })
    }
}

export const getPost = async (req, res) => {
    try {
        const onePost = await PostSchema.findById(req.params.id) //busca por id
        if (!onePost) return res.sendStatus(404) //si no existe
        return res.json(onePost) 
    } catch (error){
        console.error(error);
        return res.status(500).json({ message: error.message })
    }
}