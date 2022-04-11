import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true 
        //propiedad/método que elimina espacio a los strings
    },
    image: {
        url: String,
        public_id: String
        // url de la imagen y su id guardada en cloudinary
    }
})

export default mongoose.model('PostSchema', PostSchema)