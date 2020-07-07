import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/appointment.model';
import AppointmentRepository from '../repositories/appointment.repository';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppoinmentService {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    // use the appointmentRepository
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointmentDate = startOfHour(date);

    // try and find if theres alreay an appointment at that date
    const findAppoinmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    );
    // if there is we throw an error
    if (findAppoinmentInSameDate) {
      throw new Error('This appointment was already booked');
    }
    // we create a instance of a new appointment
    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });
    // then we need to save that instance in the
    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppoinmentService;
