import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// use decorators to make a relation between this model and the database.
@Entity('users')
class User {
  // set the type of column they will be.
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // if you dont sent anything default is varchar
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
