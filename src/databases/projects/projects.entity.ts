import {
  Column,
  CreateDateColumn,
  Entity,
  // JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from '../tasks/tasks.entity';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @OneToMany(() => Task, (task) => task.project, { eager: true })
  tasks: Task[];
}
