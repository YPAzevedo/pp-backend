import 'reflect-metadata';
// ☝🏽import reflect-metadata into our server so we can use the decorators meta data.
import express from 'express';
import routes from './routes';

import uploadConfig from './config/upload';
// import database so we can have access to it.
import './database';

const PORT = 3333;

const app = express();
app.use(express.json());
// create a route to serve static files from the temp folder
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(PORT, () => console.log(`RUNNING ON PORT ${PORT} 🔥`)); // eslint-disable-line
