import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

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
    throw new Error('JWT token is missing');
  }

  const [, token] = authorization.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jtw.secret);

    const { sub } = decodedToken as TokenPayload;

    // setting the user on the request for all subsequent middlewares after this one.
    req.user = {
      id: sub,
    };
  } catch {
    throw new Error('Invalid JWT token');
  }

  next();
};

export default ensureAuthenticated;
