import express, { json } from 'express';
import http from 'http';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import '@babel/polyfill';
import { sequelize } from './database/database';
//import { sequelize } from './database/database';

const app = express();
const { PORT } = process.env
import taskRoutes from './routes/task.routes'

//middlewares
app.use(json())
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(cors())

app.get('/', (req, res)=>{
    res.status(200).json({message:"Bienvenido a la primera api"}); 
})

app.use('/', taskRoutes)

const server = http.createServer(app);

server.listen(PORT, ()=>{
    console.log('servidor iniciado en el puerto 3001');

    sequelize.sync({ force: true })
        .then(() => console.log('Conectados a la base de datos'))
        .catch(error => console.log('Se ha producido un error', error))
})

