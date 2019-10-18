import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Notification } from 'src/entities/notification.entity';
import { User } from 'src/entities/user.entity';
import { NotificationUser } from 'src/entities/notification-user.entity';

@Injectable()
export class NotificationService {
  private readonly notificationRepository = getRepository(Notification);
  private readonly notificationUserRepository = getRepository(NotificationUser);
  private readonly userRepository = getRepository(User);
}
