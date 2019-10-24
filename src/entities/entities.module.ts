import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './index';
import { UserRepo } from './repository';

const repos = [
  UserRepo,
];

const entityArray = [
  entities.Notification,
  entities.NotificationUser,
  entities.PushSubscription,
  entities.User,
];
@Global()
@Module({
  imports: [TypeOrmModule.forFeature(entityArray)],
  exports: [TypeOrmModule, ...repos],
  providers: [...repos],
})
export class EntitiesModule { }
