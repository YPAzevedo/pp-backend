import 'reflect-metadata';
// ☝🏽import reflect-metadata into our server so we can use the decorators meta data.
import express, { Response, Request, NextFunction } from 'express';
// adding this lib to deal with errors on the async routes.
import 'express-async-errors';
import routes from './routes';

import uploadConfig from './config/upload';
// import database so we can have access to it.
import './database';
import AppError from './errors/AppError';

const PORT = 3333;

const app = express();
app.use(express.json());
// create a route to serve static files from the temp folder
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// added the lib express-async-errors so that we could get the errors from this middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  // if its an error from the AppError class
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  // if ita a error we did not exprect and its unknown.
  // we send a generic 500 error
  console.error(error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(PORT, () => console.log(`RUNNING ON PORT ${PORT} 🔥`)); // eslint-disable-line
