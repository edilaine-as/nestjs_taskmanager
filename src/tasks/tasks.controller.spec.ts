import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task, TaskPriority, TaskStatus } from './entities/task.entity';
import { mockTasksRepository } from './mock-tasks.repository';
import { NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockRepo = mockTasksRepository();

  const mockTasksService = {
    create: jest.fn((dto) => mockRepo.create(dto)),
    findAll: jest.fn(() => mockRepo.findAll()),
    findOne: jest.fn((id: string) => mockRepo.findById(id)),
    update: jest.fn((id: string, dto) => mockRepo.update(+id, dto)),
    remove: jest.fn((id: string) => mockRepo.remove(+id)),
  };

  const newTask = {
    id: '1',
    title: 'OOP',
    description: 'Studying OOP',
    status: TaskStatus.PENDING,
    priority: TaskPriority.HIGH,
    dueDate: '2025-05-20',
    userId: '123',
    user: {} as any, // ou um mock de User, se necessário
    created_at: new Date(),
    updated_at: new Date(),
  };  
  
  const newTaskEntity = {
    id: '1',
    title: 'OOP',
    description: 'OOP',
    status: TaskStatus.PENDING,
    priority: TaskPriority.HIGH,
    dueDate: new Date('2025-05-20'),
    userId: '123',
    user: {} as any, // ou um mock de User, se necessário
    created_at: new Date(),
    updated_at: new Date(),
  };  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create fn', async () => {
    const result = await controller.create(newTask)
    expect(service.create).toHaveBeenCalledWith(newTask);
    expect(result).toMatchObject(newTask)
  })
  
  it('should call return all tasks fn', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  })

  it('should call return a task by id', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual(newTask);
    expect(service.findOne).toHaveBeenCalledWith('1');
  })

  it('should throw NotFoundException if task not found', async () => {
    await expect(controller.findOne('2')).rejects.toThrow(NotFoundException);
  });

  it('should call task update fn', async () => {
    const updateTask: UpdateTaskDto = { title: 'Studying OOP' }

    jest.spyOn(service, 'update').mockResolvedValue(newTaskEntity);

    const result = await controller.update('1', updateTask);
    expect(result).toEqual(newTaskEntity);
    expect(service.update).toHaveBeenCalledWith('1', updateTask);
  })
  
  it('should call task delete fn', async () => {

    jest.spyOn(service, 'remove').mockResolvedValue(newTaskEntity);

    await expect(controller.remove('1')).resolves.toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith('1');
  })
});
