import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Projects } from './projects.entity';
import { CreateProjectDTO, UpdateProjectDTO } from './projects.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectRepository: Repository<Projects>,
  ) {}
  async getAllProjects(): Promise<Projects[]> {
    return this.projectRepository.find({
      order: {
        tasks: {
          id: 'ASC',
        },
      },
    });
  }
  async getProjectById(id: number): Promise<Projects> {
    const project = this.projectRepository.findOne({
      where: { id },
      order: {
        tasks: {
          id: 'ASC',
        },
      },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found!`);
    }
    return project;
  }
  async createProject(createProjectDto: CreateProjectDTO): Promise<Projects> {
    const project = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(project);
  }
  async updateProject(
    id: number,
    updateProjectDto: UpdateProjectDTO,
  ): Promise<Projects> {
    const project = await this.getProjectById(id);
    project.name = updateProjectDto.name;
    return this.projectRepository.save(project);
  }
  async deleteProject(id: number): Promise<void> {
    const project = await this.getProjectById(id);
    await this.projectRepository.remove(project);
  }
}
