import * as _ from 'lodash';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {
    
  } 

  async getTasks(filterDto: GetTasksFilterDto) : Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto)
  }

  // private tasks: Task[] = []
  // getAllTasks(): Task[] {
  //  return this.tasks
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //  const { status, search } = filterDto
  //  let tasks = this.getAllTasks()
  //  if (status) {
  //    tasks = tasks.filter(task => task.status = status)
  //  }
  //  if (search) {
  //    tasks = tasks.filter(task => {
  //      if (task.title.includes(search) || task.description.includes(search)) {
  //        return true
  //      }
  //      return false
  //    })
  //  }
  //  return tasks
  // }


  async getTaskById(id: string): Promise<Task> { 
    const found = await this.tasksRepository.findOne(id)

    if (!found) {
      throw new NotFoundException(`Task with Id ${id} not found`)
    }
    return found
  }
  
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto)
  }
  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task =  this.getTaskById(id)
  //   if (task) {
  //     task[status] = status
  //   }
  //   return task
  // }
  // updateTask(updateTaskDto: UpdateTaskDto): Task {
  //   const { id } =  updateTaskDto
  //   const updateValues =  _.omitBy(updateTaskDto, _.isNil)
  //   const index = this.tasks.findIndex(task => task.id === id)
  //   if (index !== -1) {
  //     const oldTask = this.tasks[index]
  //     this.tasks[index] = {...oldTask, ...updateValues}
  //     return this.tasks[index]
  //   }
  //   return null
  // }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id)

    task.status = status
    await this.tasksRepository.save(task)

    return task
  }
  
  async deleteTask(id: string) : Promise<void> {
    const result = await this.tasksRepository.delete(id)
    console.log('result', result)

    if(result.affected === 0) {
      throw new NotFoundException(`Task with Id ${id} not found`)
    }
  }
}
