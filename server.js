import express, { urlencoded } from 'express';
import cors from 'cors';
import client from './src/common/dbconn.js'; 
import peliculaRouter from './src/pelicula/pelicula.routes.js';
import actorRouter from './src/actor/actor.routes.js'; 

const PORT = 3000 
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send("Bienvenido al cine Iplacex");
});

app.use('/api/pelicula', peliculaRouter);
app.use('/api/actor', actorRouter); 

async function startServer() {
  try {
    await client.connect(); 
    console.log('Conexión exitosa a MongoDB Atlas');

    app.locals.db = client.db('cine-db'); 

    app.listen(PORT, () => {
      console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con MongoDB Atlas:', error.message);
  }
}
startServer();
