import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn, PrimaryColumn,
} from 'typeorm';

import Customer from './Customer';

@Entity('portfolio')
class Portfolio {
  @PrimaryColumn()
  ticker: string;

  @Column('int')
  quantity: number;

  @Column('decimal')
  average_price: number;

  @Column('decimal')
  total: number;

  @Column('date')
  entry_date: Date;

  @Column()
  customer_id: string;

  @ManyToOne(() => Customer, customer => customer.trading_notes)
  @JoinColumn({name: 'customer_id'})
  customer: Customer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Portfolio;
