import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appoitmentsRouter = Router();
const appoitmentsController = new AppointmentsController();

appoitmentsRouter.use(ensureAuthenticated);

// appoitmentsRouter.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appoitmentsRouter.post('/', appoitmentsController.create);

export default appoitmentsRouter;
