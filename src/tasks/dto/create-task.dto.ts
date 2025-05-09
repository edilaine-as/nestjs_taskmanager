import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum TaskStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
}

enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    description?: string

    @IsEnum(TaskStatus)
    status: TaskStatus
    
    @IsEnum(TaskPriority)
    priority: TaskPriority

    dueDate?: string
}
