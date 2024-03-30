import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { TaskStatus } from './task.status';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

// Singleton DI -  The @Injectable() decorator marks the TasksService class as a provider.
@Injectable()
export class TasksService {
  
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async getTaskById(id: string, user: User): Promise<Task> {
    // Database is an async operation
    // Object of options
    const options: FindOneOptions<Task> = {
      where: { id: id, user },
    };
    // Returns Null
    const found = await this.tasksRepository.findOne(options);
    if (!found) {
      throw new NotFoundException(`Task with '${id}' does not exist.`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {

    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.tasksRepository.save(task);

    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    // Delete does not check for the existence of the entity
    // Remove requires object
    const result = await this.tasksRepository.delete({id, user});

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID '${id}' not found.`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {

    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {

    const { status, search } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');

    query.where({user});

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
