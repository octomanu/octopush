import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from '../../../entities/notification.entity';
import { User } from '../../../entities/user.entity';
import { NotificationUser } from '../../../entities/notification-user.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

  save(data: any, userId: string) {
    const notification = {
      title: 'test',
      message: 'test message',
    };
    return Promise.all([
      this.notificationRepository.save(notification),
      this.userRepository.findOne(userId),
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
      .select(['notification', 'nu.readed'])
      .leftJoin('nu.notification', 'notification')
      .limit(10)
      .offset(offset)
      .where('nu.user = :user', {
        user: userId,
      })
      .execute();
  }

  getUnreadNotifications(userId: number, offset: number = 0) {
    return this.notificationUserRepository
      .createQueryBuilder('nu')
      .select(['notification'])
      .leftJoin('nu.notification', 'notification')
      .limit(10)
      .offset(offset)
      .where('nu.user = :user AND nu.readed = :readed', {
        user: userId,
        readed: false,
      })
      .execute();

    return this.notificationUserRepository.find({
      select: ['notification'],
      relations: ['notification'],
      where: { user: { id: userId, octopusId: 1 }, readed: false },
    });
  }
}
