import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { Repository } from "typeorm";
import { Task } from "./task.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

const mockTasksRepository = () => {
    getTasks: jest.fn();
};
const mockTasksService = () => {
    getTasks: jest.fn();
};

const mockUser = {
    username: 'Rao',
    id: 'stringid',
    password: 'password',
    tasks: [],
};

describe('TaskService', () => {
    
    let tasksService: TasksService;

    beforeEach(async() => {

        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                {provide: getRepositoryToken(Task), useFactory: mockTasksService},
            ],
        }).compile();

        tasksService = module.get<TasksService>(TasksService);
    });
    // nesting describe blocks
    describe('getTasks', () => {
        it('calls TasksService.getTasks() and returns the result.', () => {
            const result = tasksService.getTasks(null, mockUser);

        });
    });
});