import { Module } from '@nestjs/common';
import { PushNotificationsController } from './push-notifications.controller';
import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { PushNotificationsServiceModule } from './services/push-notifications-service.module';

@Module({
  controllers: [PushNotificationsController],
  imports: [PushNotificationsServiceModule],
})
export class PushNotificationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer
    //    .apply(BufferMiddleware)
    //    .forRoutes('push/key');
  }
}
