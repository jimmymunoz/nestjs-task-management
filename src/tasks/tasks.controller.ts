import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto copy';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {
  }
  
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto) :Task[] {
    // if we have any filters defined -> call 
    // otherwise, just get all tasks
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto)
    }

    return this.taskService.getAllTasks()
  }

  // localhost:3000/tasks/df579294-4362-4658-870c-08f70fd4df2a
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id)
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) : Task {
    return this.taskService.createTask(createTaskDto)
  }
  
  @Patch('/:id/:field')
  updateTask(@Param('id') id: string, @Param('field') field: string, @Body() updateTaskDto: UpdateTaskDto) : Task {
    updateTaskDto.id = id
    return this.taskService.updateTask(updateTaskDto)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) : void {
    return this.taskService.deleteTask(id)
  }
}
