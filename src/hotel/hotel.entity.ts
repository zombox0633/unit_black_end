import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column('numeric', { precision: 9, scale: 2 })
  price: number;

  @CreateDateColumn({ type: 'timestamptz' })
  doingtime: Date;
}
