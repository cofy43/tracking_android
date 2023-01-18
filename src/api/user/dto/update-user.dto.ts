import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  public id: number;

  public names: string;

  public lastName1: string;

  public lastName2: string;

  public email: string;
}
