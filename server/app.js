// app.js se configura express
import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";

import postRoutes from "./routes/posts.routes.js"; //archivo de rutas frontent

const app = express(); // creamos express

app.use(morgan("dev"));
app.use(express.json()); // para que express pueda entender los json
app.use(express.urlencoded({ extended: false }));

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
app.use('/api', postRoutes) // añadimos la ruta /api del frontent 
// con posts.routes.js aqui en el backend

export default app  // exportamos