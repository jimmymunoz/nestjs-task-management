import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {
  }
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto) :Promise<Task[]> {
    return this.taskService.getTasks(filterDto)
  }
  
  // localhost:3000/tasks/df579294-4362-4658-870c-08f70fd4df2a
  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id)
  }
  
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) : Promise<Task> {
    return this.taskService.createTask(createTaskDto)
  }
  
  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Param('field') field: string, @Body() updateTaskDto: UpdateTaskDto) : Promise<Task> {
    const {status} = updateTaskDto
    return this.taskService.updateTaskStatus(id, status)
  }
  
  @Delete('/:id')
  deleteTask(@Param('id') id: string) : Promise<void> {
    return this.taskService.deleteTask(id)
  }
}
