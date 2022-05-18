// llama app.js, conexión a la ddbb y arrancar el código 
import { connectDB } from './db.js' //importa la función desde db.js
import { PORT } from './config.js' //importa variable de entorno de config.js
import  app  from './app.js'

connectDB() // ejecuta la función de db.js

app.listen(PORT) //el servidor se queda escuchando el puerto variable de entorno
console.log ('server running on port', PORT)