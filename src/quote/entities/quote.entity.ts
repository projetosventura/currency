import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currency: string;

  @Column('decimal')
  rate: number;

  @Column()
  text: string;

  @Column()
  author: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
