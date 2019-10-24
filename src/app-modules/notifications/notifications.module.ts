import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './db-services/notification.service';
import { ConectionsModule } from '../../gateway';
import { NotificatorService } from './services/notificator.service';
import { PushNotificationsServiceModule } from '../push-notifications/services/push-notifications-service.module';

@Module({
  controllers: [NotificationController],
  imports: [ ConectionsModule, PushNotificationsServiceModule],
  providers: [NotificationService, NotificatorService],
})
export class NotificationsModule { }
