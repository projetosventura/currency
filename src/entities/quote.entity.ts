import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  author: string;

  @Column()
  currency: string;

  @Column('decimal')
  rate: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
