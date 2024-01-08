import { Module } from '@nestjs/common';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { Task } from './tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from '../projects/projects.module';
import { ProjectsService } from '../projects/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ProjectsModule],
  controllers: [TaskController],
  providers: [TaskService, ProjectsService],
})
export class TasksModule {}
