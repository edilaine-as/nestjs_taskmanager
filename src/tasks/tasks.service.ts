import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TasksRepository) {}

  async create(createTaskDto: CreateTaskDto) {
    return await this.taskRepository.create(createTaskDto);
  }

  async findAll() {
    return await this.taskRepository.findAll();
  }

  async findOne(id: string) {
    return await this.taskRepository.findById(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: string) {
    return await this.taskRepository.remove(id);
  }
}
