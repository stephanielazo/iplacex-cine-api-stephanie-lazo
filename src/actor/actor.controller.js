import { ObjectId } from 'mongodb';
import client from '../common/dbconn.js';
import { Actor } from './actor.js';

const actorCollection = client.db('cine-db').collection('actores');
const peliculaCollection = client.db('cine-db').collection('peliculas');

async function handleInsertActorRequest(req, res) {
  let data = req.body;

  try {
    let pelicula = await peliculaCollection.findOne({ nombre: data.idPelicula });
    if (!pelicula) {
      return res.status(400).send("La película asignada no existe");
    }

    let actor = {
      ...Actor,
      _id: new ObjectId(),
      idPelicula: pelicula._id.toString(),
      nombre: data.nombre,
      edad: data.edad,
      estaRetirado: data.estaRetirado,
      premios: data.premios,
    };

    await actorCollection.insertOne(actor)
      .then((result) => {
        if (result === null) return res.status(400).send("Error al guardar");
        return res.status(201).send(result);
      })
      .catch((e) => res.status(500).send({ error: e }));
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
}

async function handleGetActoresRequest(req, res) {
  await actorCollection.find({}).toArray()
    .then((data) => res.status(200).send(data))
    .catch((e) => res.status(500).send({ error: e }));
}

async function handleGetActorByIdRequest(req, res) {
  let id = req.params.id;

  try {
    let oid = ObjectId.createFromHexString(id);

    await actorCollection.findOne({ _id: oid })
      .then((data) => {
        if (data === null) return res.status(404).send(data);
        return res.status(200).send(data);
      })
      .catch((e) => res.status(500).send({ error: e.code }));
  } catch (e) {
    return res.status(400).send("Id mal formado");
  }
}

async function handleGetActoresByPeliculaIdRequest(req, res) {
  let peliculaId = req.params.pelicula; 
  
  try {
    let oid = ObjectId.createFromHexString(peliculaId);

    await actorCollection.find({ idPelicula: oid.toString() }).toArray()
      .then((data) => {
        if (data.length === 0) return res.status(404).send("No se encontraron actores para la película");
        return res.status(200).send(data);
      })
      .catch((e) => res.status(500).send({ error: e.code }));
  } catch (e) {
    return res.status(400).send("Id mal formado");
  }
}

export default {
  handleInsertActorRequest,
  handleGetActoresRequest,
  handleGetActorByIdRequest,
  handleGetActoresByPeliculaIdRequest,
};
