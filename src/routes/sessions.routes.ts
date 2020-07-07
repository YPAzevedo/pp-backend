import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  } catch (error) {
    // if something goes wrong we return a 400 with the error message.
    return res.status(400).json(error.message);
  }
});

export default sessionsRouter;
