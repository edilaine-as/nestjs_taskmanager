import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

// PartialType = propriedades opcionais
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
