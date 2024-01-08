import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProjectDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateProjectDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
