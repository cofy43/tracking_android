import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthHelper } from '../auth/auth.helper';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  async create(createUserDto: CreateUserDto) {
    const user = await this.repository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new HttpException('register user', HttpStatus.NOT_FOUND);
    }
    createUserDto.password = this.helper.encodePassword(createUserDto.password);
    // TODO: send email wiht confirmation
    return await this.repository.save(createUserDto);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({
      where: { id: id },
      select: ['names', 'lastName1', 'lastName2', 'email'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOne({
      where: { email: updateUserDto.email, id: updateUserDto.id },
    });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(user, updateUserDto);
    return await this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.repository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return await this.repository.remove(user);
  }
}
