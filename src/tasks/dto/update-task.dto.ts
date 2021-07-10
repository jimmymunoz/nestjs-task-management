import { TaskStatus } from '../task.model';
import { IsEnum } from 'class-validator';
export class UpdateTaskDto {
  id: string
  title: string
  description: string
  @IsEnum(TaskStatus)
  status: TaskStatus
}