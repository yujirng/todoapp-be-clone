import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTasksDTO, UpdateTasksDTO } from './tasks.dto';
import { Projects } from '../projects/projects.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Projects)
    private readonly projectRepository: Repository<Projects>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }

    return task;
  }

  async createTask(createTaskDto: CreateTasksDTO): Promise<Task> {
    const { name, isActive, isDone, projectId } = createTaskDto;

    const currentDate = new Date();

    const insertTask = new Task();
    insertTask.name = name;
    insertTask.isActive = isActive;
    insertTask.isDone = isDone;
    insertTask.createDate = currentDate;
    insertTask.updateDate = currentDate;
    insertTask.project = await this.findProjectById(projectId);

    return this.taskRepository.save(insertTask);
    // const result = await this.taskRepository.insert(task);
    // return result.raw[0];
  }

  async updateTask(id: number, updatedTask: UpdateTasksDTO): Promise<Task> {
    await this.getTaskById(id);
    const currentDate = new Date();
    updatedTask.updateDate = currentDate;
    await this.taskRepository.update(id, updatedTask);

    return this.taskRepository.findOne({ where: { id } });
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.getTaskById(id);

    await this.taskRepository.remove(task);
  }

  private async findProjectById(projectId: number): Promise<Projects> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found!`);
    }
    return project;
  }
}
