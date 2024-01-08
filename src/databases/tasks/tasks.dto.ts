import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTasksDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isDone: boolean;

  createDate: Date;
  updateDate: Date;

  @IsNotEmpty()
  @IsNumber()
  projectId: number;
}

export class UpdateTasksDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isDone: boolean;

  createDate: Date;
  updateDate: Date;

  @IsNotEmpty()
  @IsNumber()
  projectId: number;
}
