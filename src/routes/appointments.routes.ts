import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/appointment.repository';
import CreateAppointmentService from '../services/CreateAppoinmentService';

const appointmentsRouter = Router();

// addes async methods to the routes to be able to use await for the database
appointmentsRouter.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const allAppointments = await appointmentRepository.find();

  return res.json(allAppointments);
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const createAppoinmentService = new CreateAppointmentService();
    const { provider_id, date } = req.body;
    // parsed the date from ISO to date format
    const parsedDate = parseISO(date);
    // try and execute the appointment creation service sending the provider name and appointment date
    const appointment = await createAppoinmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (error) {
    // if something goes wrong we return a 400 with the error message.
    return res.status(400).json(error.message);
  }
});

export default appointmentsRouter;
