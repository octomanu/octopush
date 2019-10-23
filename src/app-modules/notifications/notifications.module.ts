import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { EntitiesModule } from '../../entities/entities.module';
import { NotificationService } from './db-services/notification.service';
import { ConectionsModule } from '../../gateway';
import { NotificatorService } from './services/notificator.service';
import { PushNotificationsServiceModule } from '../push-notifications/services/push-notifications-service.module';
import { UserRepo } from './db-services/user.repo';

@Module({
  controllers: [NotificationController],
  imports: [EntitiesModule, ConectionsModule, PushNotificationsServiceModule],
  providers: [NotificationService, NotificatorService, UserRepo],
})
export class NotificationsModule {}
