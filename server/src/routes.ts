import express from 'express';
import ClassesControllers from './controllers/ClassesControllers';
import ConnectionsController from './controllers/ConnectionController';

// roteamento do express
const routes = express.Router(); 

// importando a classe que faz a criação da aula
const classesControllers = new ClassesControllers();
const connectionsController = new ConnectionsController();

// listar uma aula 
routes.get('/classes', classesControllers.index);

// criar uma aula 
routes.post('/classes', classesControllers.create);

// criar uma conecção
routes.post('/connections', connectionsController.create);

// listar total de conecções
routes.get('/connections', connectionsController.index);


export default routes;