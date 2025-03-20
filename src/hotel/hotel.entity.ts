import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column('numeric', { precision: 9, scale: 2 })
  price: number;

  @Column({ type: 'timestamp with time zone' })
  doingtime: Date;
}
