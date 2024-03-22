import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

//   @Get()
//   getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
//     if (Object.keys(filterDto).length) {
//       return this.tasksService.getTasksWithFilter(filterDto);
//     } else {
//       return this.tasksService.getAllTasks();
//     }
//   }

//   @Post()
//   createTask(@Body() createTaskDto: CreateTaskDto): Task {
//     return this.tasksService.createTask(createTaskDto);
//   }

//   @Get('/:id')
//   getTaskById(@Param('id') id: string): Task {
//     return this.tasksService.getTaskById(id);
//   }

//   @Delete('/:id')
//   deleteTaskById(@Param('id') id: string): void {
//     this.tasksService.deleteTaskById(id);
//   }

//   @Patch('/:id/status')
//   updateTaskStatus(
//     @Param('id') id: string,
//     @Body() updateTaskStatusDto: UpdateTaskStatusDto,
//   ): Task {
//     // destructure
//     const { status } = updateTaskStatusDto;
//     return this.tasksService.updateTaskStatus(id, status);
//   }
}
