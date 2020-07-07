import { Router } from 'express';
import appointmentsRotuter from './appointments.routes';
import usersRotuter from './users.routes';
import sessionsRotuter from './sessions.routes';

const routes = Router();

// make the router use the appointmentsRoutes middleware so we compose the routes
// always starting with /appointments
routes.use('/appointments', appointmentsRotuter);
routes.use('/users', usersRotuter);
routes.use('/sessions', sessionsRotuter);

export default routes;
