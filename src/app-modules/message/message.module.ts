import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { ConectionsModule } from '../../gateway';

@Module({
  providers: [],
  imports: [ConectionsModule],
  controllers: [MessageController],
})
export class MessageModule {}
