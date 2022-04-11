import dotenv from 'dotenv' //lee los archivos .env

dotenv.config() 
// metodo config() carga las varibles desde .env a process.env

export const MONGODB_URI = process.env.MONGODB_URI
export const PORT = process.env.PORT || 5000 

export const CLOUD_NAME = process.env.CLOUD_NAME
export const API_KEY =  process.env.API_KEY
export const API_SECRET = process.env.API_SECRET
// sino existe la variable PORT levanta el servidor en el 5000