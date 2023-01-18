import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { UserModule } from './user/user.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [EmailModule, UserModule, DeviceModule],
})
export class ApiModule {}
