import express from 'express';
import controller from './actor.controller.js';

const actorRoutes = express.Router();

actorRoutes.post('/actor', controller.handleInsertActorRequest);
actorRoutes.get('/actores', controller.handleGetActoresRequest);
actorRoutes.get('/actor/:id', controller.handleGetActorByIdRequest);
actorRoutes.get('/actor/pelicula/:pelicula', controller.handleGetActoresByPeliculaIdRequest);

export default actorRoutes;
