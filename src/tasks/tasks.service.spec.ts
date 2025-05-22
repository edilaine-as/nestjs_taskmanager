import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskPriority, TaskStatus } from './entities/task.entity';
import { TasksRepository } from './tasks.repository';
import { mockTasksRepository } from './mock-tasks.repository';

describe('TasksService', () => {
  let service: TasksService;
  let tasksRepositoryMock: ReturnType<typeof mockTasksRepository>;

  beforeEach(async () => {
    tasksRepositoryMock = mockTasksRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useValue: tasksRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const newTask = {
      title: 'OOP',
      description: 'Studying OOP',
      status: TaskStatus.PENDING,
      priority: TaskPriority.HIGH,
      dueDate: '20/05/2025',
    };

    const task = await service.create(newTask);

    expect(task).toHaveProperty('id');
    expect(task.title).toBe('OOP');
  });

  it('should return all tasks', async () => {
    const newTask = {
      title: 'OOP',
      description: 'Studying OOP',
      status: TaskStatus.PENDING,
      priority: TaskPriority.HIGH,
      dueDate: '20/05/2025',
    };

    await service.create(newTask);
    const tasks = await service.findAll();

    expect(tasks.length).toBeGreaterThan(0);
  });

  it('should return a task by id', async () => {
    const newTask = {
      title: 'OOP',
      description: 'Studying OOP',
      status: TaskStatus.PENDING,
      priority: TaskPriority.HIGH,
      dueDate: '20/05/2025',
    };

    const task = await service.create(newTask);
    const foundTask = await service.findOne(task.id.toString());

    expect(foundTask).toEqual(task);
  });

  it('should update a task', async () => {
    const newTask = {
      title: 'OOP',
      description: 'Studying OOP',
      status: TaskStatus.PENDING,
      priority: TaskPriority.HIGH,
      dueDate: '20/05/2025',
    };

    const task = await service.create(newTask);
    const updated = await service.update(task.id, { title: 'Class' });

    expect(updated!.title).toBe('Class');
  });

  it('should delete a task', async () => {
    const newTask = {
      title: 'OOP',
      description: 'Studying OOP',
      status: TaskStatus.PENDING,
      priority: TaskPriority.HIGH,
      dueDate: '20/05/2025',
    };

    const task = await service.create(newTask);
    const deleted = await service.remove(task.id.toString());

    expect(deleted).toBeNull()
  });
});
