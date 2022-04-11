// este archivo configura express
import express from 'express'
import fileUpload from "express-fileupload";
import postRoutes from './routes/posts.routes.js' //importa la ruta 
import morgan from 'morgan'

const app = express () // creamos express

app.use(morgan('dev'))

// middlewares
app.use(express.json()) 
// para que express pueda entender los json

app.use(
    fileUpload({
      tempFileDir: "./upload",
      useTempFiles: true,
    })
  );

// la imagen subida no la mantenga en memoria sino que la guarda
// en un archivo

// para indicarle al servidor que tipo de dato se envia desde el cliente
// ThunderClient => headers => content-type => 'application/json'

// antes de las rutas, se procesan los middlewares  
// de lo contrario no funciona.

// rutas
app.use('/', postRoutes) // añadimos la ruta /api del frontent 
// con posts.routes.js aqui en el backend

export default app  // exportamos