import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PushSubscription } from './push-subscription.entity';
import { NotificationUser } from './notification-user.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  octopusId: number;

  @Column('int')
  administrationId: number;

  @OneToMany(
    type => PushSubscription,
    pushSubscription => pushSubscription.user,
  )
  pushSubscriptions: PushSubscription[];

  @OneToMany(
    type => NotificationUser,
    notificationUser => notificationUser.user,
  )
  notificationUsers: NotificationUser[];
}
