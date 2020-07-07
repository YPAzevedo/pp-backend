import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/appointment.model';

// creates a relations between the Appointment model and this repository.
// created this custom repository to add the findByDate method
@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    // find a appointment where the date is the same as the date passed into the method.
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentRepository;
