import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Customer from './Customer';
import Broker from './Broker';

@Entity('trading_notes')
class TradingNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  ticker: string;

  @Column('int')
  quantity: number;

  @Column()
  type: 'buy' | 'sale';

  @Column('decimal')
  price: number;

  @Column('date')
  date: Date;

  @Column()
  customer_id: string;

  @ManyToOne(() => Customer, customer => customer.trading_notes)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Broker, broker => broker.trading_notes)
  @JoinColumn({ name: 'broker_cnpj' })
  broker_cnpj: Broker;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TradingNote;
