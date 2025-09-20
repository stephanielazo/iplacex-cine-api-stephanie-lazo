import express from 'express';
import controller from './pelicula.controller.js';

const peliculaRoutes = express.Router();


peliculaRoutes.post('/', controller.handleInsertPeliculaRequest);
peliculaRoutes.get('/', controller.handleGetPeliculasRequest);
peliculaRoutes.get('/:id', controller.handleGetPeliculaByIdRequest);
peliculaRoutes.put('/:id', controller.handleUpdatePeliculaByIdRequest);
peliculaRoutes.delete('/:id', controller.handleDeletePeliculaByIdRequest);

export default peliculaRoutes;
