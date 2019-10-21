import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user.entity';
import { Notification } from './notification.entity';

@Entity()
export class NotificationUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.pushSubscriptions)
  user: User;

  @Column()
  readed: boolean;

  @ManyToOne(
    type => Notification,
    notification => notification.notificationUsers,
  )
  notification: Notification;
}
