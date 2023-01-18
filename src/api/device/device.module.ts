import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { User } from '../user/entities/user.entity';
import { Device } from './entities/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Device])],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
