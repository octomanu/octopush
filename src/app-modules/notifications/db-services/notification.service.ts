import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from '../../../entities/notification.entity';
import { User } from '../../../entities/user.entity';
import { NotificationUser } from '../../../entities/notification-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNotificationDto } from '../dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(NotificationUser)
    private readonly notificationUserRepository: Repository<NotificationUser>,
  ) {}

  save(data: CreateNotificationDto) {
    const notification = { ...data };
    delete notification.idUsuario;
    return Promise.all([
      this.notificationRepository.save(notification),
      this.userRepository.findOne(data.idUsuario),
    ]).then(([notificationDb, userDb]) =>
      this.notificationUserRepository.save({
        user: userDb,
        notification: notificationDb,
        readed: false,
      }),
    );
  }

  getNotifications(userId: number, offset: number = 0) {
    return this.notificationUserRepository
      .createQueryBuilder('nu')
      .select([
        'notification.id as id',
        'notification.message as message',
        'notification.title as title',
        'nu.readed as readed',
      ])
      .leftJoin('nu.notification', 'notification')
      .limit(10)
      .offset(offset)
      .where('nu.user = :user', {
        user: userId,
      })
      .orderBy('nu.id', 'DESC')
      .execute();
  }

  markAsRead(notificationId: number, userId: number) {
    return this.notificationUserRepository
      .createQueryBuilder()
      .update()
      .set({ readed: true })
      .where('user = :user AND notification = :notification', {
        user: userId,
        notification: notificationId,
      })
      .execute();
  }

  getUnreadNotifications(userId: number, offset = 0, limit = 5) {
    return this.notificationUserRepository
      .createQueryBuilder('nu')
      .select([
        'notification.id as id',
        'notification.message as message',
        'notification.title as title',
        'nu.readed as readed',
      ])
      .leftJoin('nu.notification', 'notification')
      .limit(limit)
      .offset(offset)
      .where('nu.user = :user AND nu.readed = :readed', {
        user: userId,
        readed: false,
      })
      .execute();
  }
}
