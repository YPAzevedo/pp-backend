import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './user.model';

// use decorators to make a relation between this model and the database.
@Entity('appointments')
class Appointment {
  // set the type of column they will be.
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // if you dont sent anything default is varchar
  @Column()
  provider_id: string;

  // sets the relation to providers to appointments and join columns for the provider id
  // with the User model.
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  // time with timezone because we are using postegres, other wise id have to use timestamp.
  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
