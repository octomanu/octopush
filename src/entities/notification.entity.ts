import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { NotificationUser } from './notification-user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  message: string;

  @OneToMany(
    type => NotificationUser,
    notificationUser => notificationUser.notification,
  )
  notificationUsers: NotificationUser[];
}
