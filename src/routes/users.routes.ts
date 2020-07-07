import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

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

export default usersRouter;