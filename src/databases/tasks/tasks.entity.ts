import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  // PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Projects } from '../projects/projects.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDone: boolean;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(() => Projects, (project) => project.tasks)
  project: Projects;
}
