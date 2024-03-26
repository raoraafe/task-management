import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.status';

@Entity() // Used for autoloadingEnteties
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
