import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>
  ){}

  create(createTaskDto: CreateTaskDto) {
    const task = this.repository.create(createTaskDto)
    return this.repository.save(task)
  }

  findAll() {
    return this.repository.find()
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id })
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.repository.findOneBy({ id })

    if(!task) return null

    this.repository.merge(task, updateTaskDto)
    return this.repository.save(task)
  }

  async remove(id: string) {
    const task = await this.repository.findOneBy({ id })

    if(!task) return null

    this.repository.remove(task)
  }
}
