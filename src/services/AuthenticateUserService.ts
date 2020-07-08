import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

import User from '../models/user.model';

import AppError from '../errors/AppError';

interface RequestDTO {
  email: string;
  password: string;
}

interface AuthenticateUserServiceResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: RequestDTO): Promise<AuthenticateUserServiceResponse> {
    const usersRepository = getRepository(User);

    // look if user already exists with email sent.
    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email or password', 401);
    }

    // user.password --> hashed password.
    // password --> unhashed password.

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email or password', 401);
    }

    const { secret, expiration } = authConfig.jtw;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiration,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
