import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatar from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update avatar from user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatar(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'iTest',
      email: 'iTest@gmail.com',
      password: '654321',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'testAvatar.png',
    });

    expect(user.avatar).toBe('testAvatar.png');
  });

  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatar(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'testAvatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatar(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'iTest',
      email: 'iTest@gmail.com',
      password: '654321',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'testAvatar.png',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'testAvatar2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('testAvatar.png');
    expect(user.avatar).toBe('testAvatar2.png');
  });
});
