import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currency: string;

  @Column('decimal')
  rate: number;

  @Column({ type: 'datetime' })
  createdAt: Date;
}
