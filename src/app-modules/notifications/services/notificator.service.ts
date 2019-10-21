import { Injectable } from '@nestjs/common';
import { ConectionService } from '../../../gateway';
import { User, Notification } from '../../../entities';

@Injectable()
export class NotificatorService {
  constructor(private readonly conectionService: ConectionService) {}

  hasConection(UserId) {
    return this.conectionService.getUserConection(UserId).length > 0;
  }

  notify(user: User, notification: Notification) {
    const conections = this.conectionService.getUserConection(user.octopusId);
    if (conections.length <= 0) {
      return;
    }

    conections.forEach(conection => {
      this.conectionService.server.to(conection).emit('[User] Notification', {
        title: notification.title,
        message: notification.message,
      });
    });
  }
}
