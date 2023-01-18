import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceDto } from './create-device.dto';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
  public name: string;

  public model: string;

  public operatingSystem: string;

  public userId: number;
}
