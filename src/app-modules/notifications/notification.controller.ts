import { Controller, Post, Body } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  @Post()
  create(@Body() data: CreateNotificationDto) {
    
  }
}
