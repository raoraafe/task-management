import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.status';
import { User } from '../auth/user.entity';
import { Exclude } from 'class-transformer';

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

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude( { toPlainOnly: true }) // Exclude user property from task (JSON) response - Transformer library
  user: User;
}
