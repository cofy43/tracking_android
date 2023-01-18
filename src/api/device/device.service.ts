import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';

@Injectable()
export class DeviceService {
  @InjectRepository(Device)
  private readonly repository: Repository<Device>;

  async create(createDeviceDto: CreateDeviceDto) {
    return await this.repository.save(createDeviceDto);
  }

  async findAll() {
    return await this.repository.find({
      relations: { user: true },
    });
  }

  async findOne(id: number) {
    return await this.repository.findOne({
      where: { id: id },
    });
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.repository.findOne({
      where: { id: id },
      relations: { user: true },
    });
    if (!device) {
      throw new HttpException('device not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(device, updateDeviceDto);
    return await this.repository.save(device);
  }

  async remove(id: number) {
    const device = await this.repository.findOne({
      where: { id: id },
    });
    if (!device) {
      throw new HttpException('device not found', HttpStatus.NOT_FOUND);
    }
    return await this.repository.remove(device);
  }
}
