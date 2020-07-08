import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    // try to verify and decode the token, it returns the token payload you encrypted.
    const decodedToken = verify(token, authConfig.jtw.secret);
    // get the subject from the token AKA the users id.
    const { sub } = decodedToken as TokenPayload;

    // setting the user on the request for all subsequent middlewares after this one.
    req.user = {
      id: sub,
    };
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }

  next();
};

export default ensureAuthenticated;
