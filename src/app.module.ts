import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoModule } from './app-modules/photo/photo.module';
import { DatabaseModule } from './database/database.module';
import { MessageModule } from './app-modules/message/message.module';
import { GatewayModule } from './gateway/gateway.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushNotificationsModule } from './app-modules/push-notifications/push-notifications.module';
import { NotificationsModule } from './app-modules/notifications/notifications.module';
import { EntitiesModule } from './entities/entities.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PhotoModule,
    DatabaseModule,
    MessageModule,
    GatewayModule,
    PushNotificationsModule,
    NotificationsModule,
    EntitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
