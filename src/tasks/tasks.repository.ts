import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = this.repo.create(createTaskDto);
    return await this.repo.save(task);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findById(id: string) {
    return await this.repo.findOneBy({ id });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.repo.findOneBy({ id });

    if (!task) return null;

    this.repo.merge(task, updateTaskDto);
    return await this.repo.save(task);
  }

  async remove(id: string) {
    const task = await this.repo.findOneBy({ id });

    if (!task) return null;

    return await this.repo.remove(task);
  }
}
