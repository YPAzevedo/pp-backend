import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/user.model';

import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

interface RequestDTO {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new AppError(
        'Only authenticated users can change their avatar',
        401,
      );
    }

    if (user.avatar) {
      // look for the path for the user avatar
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // check if the file exists
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        // delete old user avatar.
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    // setting the user avatar with new avatar.
    user.avatar = avatarFilename;
    // use repository.save that updates if already exists/creates users
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
