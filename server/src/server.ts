import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

// faz com que outros endereço acessem esse servidor back-end
app.use(cors());

// aplicacao entenda o pacote json
app.use(express.json());

// importando as rotas 
app.use(routes);

// porta definida, localhost:3333  | // porta padrão 80, nunca aparece nos sites a porta 
app.listen(3333);