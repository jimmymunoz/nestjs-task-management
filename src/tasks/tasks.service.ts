import {v4 as uuid} from 'uuid'
import * as _ from 'lodash'
import { Injectable } from '@nestjs/common';
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
    return this.tasks.find(task => task.id = id)
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
    const index = this.tasks.findIndex(task => task.id === id)
    if (index !== -1) {
      this.tasks.splice(index, 1)
    }
  }
}
