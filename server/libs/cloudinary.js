// para subir archivos
import { v2 as cloudinary } from "cloudinary";
import { API_SECRET, API_KEY, CLOUD_NAME } from "../config.js";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

// funcion para subir imagen a cloudinary
export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "samples",
  });
  // v2 => propiedad que llama un metodo => upload para
  // subir los archivos a cloudinary
};

// función para eliminar imagen de cloudinay
export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
