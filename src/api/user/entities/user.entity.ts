import { Device } from 'src/api/device/entities/device.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public names: string;

  @Column({ type: 'varchar', name: 'last_name1' })
  public lastName1: string;

  @Column({ type: 'varchar', name: 'last_name2' })
  public lastName2: string;

  @Column({ type: 'varchar' })
  public email: string;

  @Column({ type: 'varchar', select: false })
  public password: string;

  @Column({ type: 'varchar', name: 'request_code', default: '' })
  public requestCode: string;

  @OneToMany((type) => Device, (device) => device.user)
  public devices: Device[];
}
