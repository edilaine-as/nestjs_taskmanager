import { TaskPriority, TaskStatus } from './entities/task.entity';

type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
};

export const mockTasksRepository = () => {
  const tasks: Task[] = [];

  return {
    create: jest.fn().mockImplementation((dto) => {
      const newTask: Task = { id: tasks.length + 1, ...dto };
      tasks.push(newTask);
      return newTask;
    }),

    findAll: jest.fn().mockImplementation(() => Promise.resolve(tasks)),

    findById: jest
      .fn()
      .mockImplementation((id: string) =>
        Promise.resolve(tasks.find((task) => task.id.toString() === id)),
      ),

    update: jest.fn().mockImplementation((id: number, dto) => {
      const index = tasks.findIndex((task) => task.id === id);
      if (index === -1) return null;
      tasks[index] = { ...tasks[index], ...dto };
      return Promise.resolve(tasks[index]);
    }),

    remove: jest.fn().mockImplementation((id: number) => {
      const index = tasks.findIndex((task) => task.id === id);
      if (index === -1) return null;
      const [removed] = tasks.splice(index, 1);
      return Promise.resolve(removed);
    }),
  };
};
