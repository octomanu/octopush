import { Controller, Post, Get, UseInterceptors, Header, Body } from '@nestjs/common';
import { BufferInterceptor } from './buffer.interceptor';
import * as urlSafeBase64 from 'urlsafe-base64';
import * as webPush from 'web-push';
const vapid = require('../../../vapid.json');

@Controller('push')
export class PushNotificationsController {


    private subscripcions = [];

    constructor() {
        webPush.setVapidDetails(
            'mailto:mpanizzo@octopus.com.ar',
            vapid.publicKey,
            vapid.privateKey
        );
    }

    @Post('subscribe')
    subscribe(@Body() body) {
        console.log("body_: ", body);
        this.subscripcions.push(body.subscription);
    }


    @Get('key')
    @UseInterceptors(new BufferInterceptor())
    key() {

        console.log(urlSafeBase64.decode(vapid.publicKey));
        return urlSafeBase64.decode(vapid.publicKey);

    }

    //a servicio
    @Get('test')
    sendPush() {

        const not = {
            title: 'test',
            user: 'none',
            message: 'ejejeje'
        };

        this.subscripcions.forEach((subs, index) => {
            console.log("send notification");
            webPush.sendNotification(subs, JSON.stringify(not));

        });

    }
}
