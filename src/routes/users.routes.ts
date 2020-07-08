import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

import uploadConfig from '../config/upload';

// create a instance of multer with the config option we set on upload config.
const upload = multer(uploadConfig);

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  } catch (error) {
    // if something goes wrong we return a 400 with the error message.
    return res.status(400).json(error.message);
  }
});

// use the multer instance as middleware for the avatar uplaod, use dingle since its a single file.
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const updateUserAvatarService = new UpdateUserAvatarService();

      const user = await updateUserAvatarService.execute({
        userId: req.user.id,
        avatarFilename: req.file.filename,
      });

      delete user.password;

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);

export default usersRouter;
