import {v4 as uuid} from 'uuid'
import * as _ from 'lodash'
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto copy';


@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
   return this.tasks 
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
   const { status, search } = filterDto

   let tasks = this.getAllTasks()

   if (status) {
     tasks = tasks.filter(task => task.status = status)
   }

   if (search) {
     tasks = tasks.filter(task => {
       if (task.title.includes(search) || task.description.includes(search)) {
         return true
       }
       return false
     })
   }

   return tasks
  }

  getTaskById(id: string) : Task {
    // try to get task
    // if not found, throw an error 404 not found
    // otherwise, retunr the found task
    const found = this.tasks.find(task => task.id = id)
    if(!found) {
      throw new NotFoundException(`Task with Id ${id} not found`)
    }
    return found
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const {title, description} = createTaskDto
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    }
    this.tasks.push(task)
    return task
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task =  this.getTaskById(id)
    if (task) {
      task[status] = status
    }
    return task
  }

  updateTask(updateTaskDto: UpdateTaskDto): Task {
    const { id } =  updateTaskDto
    const updateValues =  _.omitBy(updateTaskDto, _.isNil)
    const index = this.tasks.findIndex(task => task.id === id)
    if (index !== -1) {
      const oldTask = this.tasks[index]
      this.tasks[index] = {...oldTask, ...updateValues}
      return this.tasks[index]
    }
    return null
  }

  deleteTask(id: string) : void {
    this.getTaskById(id)
    this.tasks = this.tasks.filter(task => task.id !== id)
  }
}
