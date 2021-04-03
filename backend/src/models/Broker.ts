import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import TradingNote from './TradingNote';

@Entity('brokers')
class Broker {
  @PrimaryColumn('char', { length: 14, unique: true })
  cnpj: string;

  @Column()
  name: string;

  @Column()
  website: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => TradingNote, trading_notes => trading_notes.broker_cnpj)
  trading_notes: TradingNote[];
}

export default Broker;
