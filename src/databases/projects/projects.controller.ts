import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO, UpdateProjectDTO } from './projects.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @Get(':id')
  getProjectById(@Param('id') id: number) {
    return this.projectService.getProjectById(id);
  }

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDTO) {
    return this.projectService.createProject(createProjectDto);
  }

  @Put(':id')
  updateProject(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDTO,
  ) {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: number) {
    return this.projectService.deleteProject(id);
  }
}
