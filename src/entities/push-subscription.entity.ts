import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PushSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  subscription: any;

  @ManyToOne(type => User, user => user.pushSubscriptions)
  user: User;
}
