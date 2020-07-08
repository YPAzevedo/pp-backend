import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/user.model';

import AppError from '../errors/AppError';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const userAlreadyExists = await usersRepository.findOne({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new AppError('This email already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
