import { IsEnum, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

    @IsOptional()
    @IsISO8601() // 2025-05-12T15:00:00Z
    dueDate?: string
}
