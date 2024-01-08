import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTasksDTO, UpdateTasksDTO } from './tasks.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() task: CreateTasksDTO): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Put(':id')
  updateTask(
    @Param('id') id: number,
    @Body() updatedTask: UpdateTasksDTO,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updatedTask);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
