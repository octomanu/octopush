import { Controller, Post, Get, UseInterceptors, Body } from '@nestjs/common';
import { BufferInterceptor } from './buffer.interceptor';
import * as urlSafeBase64 from 'urlsafe-base64';
import * as webPush from 'web-push';
import { PushNotificationsService } from './services/push-notifications.service';
const vapid = require('../../../vapid.json');

@Controller('push')
export class PushNotificationsController {
  private subscripcions = [];

  constructor(
    private readonly pushNotificationsService: PushNotificationsService,
  ) {}

  @Post('subscribe')
  subscribe(@Body() body) {
    this.pushNotificationsService.save(body.subscription, body.userId);
  }

  @Get('key')
  @UseInterceptors(new BufferInterceptor())
  key() {
    return urlSafeBase64.decode(vapid.publicKey);
  }

  //a servicio
  @Get('test')
  sendPush() {
    // const not = {
    //   title: 'Hola Octopus!',
    //   user: 'none',
    //   message: 'ejejeje',
    // };
    // this.pushConectionsService.save(body.subscription, body.userId);
    // this.subscripcions.forEach((subs, index) => {
    //   console.log('send notification');
    //   webPush.sendNotification(subs, JSON.stringify(not));
    // });
  }
}
