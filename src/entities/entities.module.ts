import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './index';

const entityArray = [
  entities.Notification,
  entities.NotificationUser,
  entities.PushSubscription,
  entities.User,
];

@Module({
  imports: [TypeOrmModule.forFeature(entityArray)],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
