import { User } from 'src/api/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne((type) => User, (user) => user.devices, {
    onDelete: 'CASCADE',
  })
  public user: User;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public model: string;

  @Column({ type: 'varchar', name: 'operating_system' })
  public operatingSystem: string;
}
