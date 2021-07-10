import { TaskStatus } from '../task.model';
import { IsOptional, IsString, IsEnum } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus

  @IsOptional()
  @IsString()
  search?: string
}