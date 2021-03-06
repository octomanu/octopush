import { Controller, Post, Body, Get, Param, Query, Put } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './db-services/notification.service';
import { NotificatorService } from './services/notificator.service';
import { PushNotificationsService } from '../push-notifications/services/push-notifications.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly notificator: NotificatorService,
    private readonly pushNotificator: PushNotificationsService,
  ) {}

  @Get(':userId')
  all(@Param('userId') userId: number, @Query('offset') offset: number) {
    return this.notificationService.getNotifications(userId, offset);
  }

  @Get('unread/:userId')
  unread(
    @Param('userId') userId: number,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    return this.notificationService.getUnreadNotifications(
      userId,
      offset,
      limit,
    );
  }

  @Put(':userId/markAsRead')
  markAsRead(
    @Param('userId') userId: number,
    @Body() data: { notificationId: number },
  ) {
    return this.notificationService.markAsRead(data.notificationId, userId);
  }

  @Post()
  create(@Body() data: CreateNotificationDto) {
    return this.notificationService.save(data).then(userNotification => {
      if (this.notificator.hasConection(userNotification.user.octopusId)) {
        this.notificator.notify(
          userNotification.user,
          userNotification.notification,
        );
      } else if (
        this.pushNotificator.hasSubscription(userNotification.user.octopusId)
      ) {
        this.pushNotificator.notify(
          userNotification.notification,
          userNotification.user,
        );
      }
    });
  }
}
