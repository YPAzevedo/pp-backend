import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/user.model';

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
      throw new Error('Incorrect email or password');
    }

    // user.password --> hashed password.
    // password --> unhashed password.

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email or password');
    }

    const token = sign({}, 'cfd61b8a7397fa7c10b2ae548f5bfaef', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
