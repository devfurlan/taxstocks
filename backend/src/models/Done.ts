import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn, PrimaryColumn, PrimaryGeneratedColumn,
} from 'typeorm';

import Customer from './Customer';

@Entity('done')
class Done {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ticker: string;

  @Column('int')
  quantity: number;

  @Column('decimal')
  entry_price: number;

  @Column('date')
  entry_date: Date;

  @Column('decimal')
  exit_price: number;

  @Column('date')
  exit_date: Date;

  @Column('decimal')
  balance: number;

  @Column()
  customer_id: string;

  @ManyToOne(() => Customer, customer => customer.trading_notes)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Done;
