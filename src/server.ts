import 'reflect-metadata';
// ☝🏽import reflect-metadata into our server so we can use the decorators meta data.
import express from 'express';
import routes from './routes';

// import database so we can have access to it.
import './database';

const PORT = 3333;

const app = express();
app.use(express.json());

app.use(routes);

app.listen(PORT, () => console.log(`RUNNING ON PORT ${PORT} 🔥`)); // eslint-disable-line
