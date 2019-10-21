import { Injectable } from '@nestjs/common';
import * as webPush from 'web-push';
import { Notification, User } from 'src/entities';
const vapid = require('../../../../vapid.json');

@Injectable()
export class PushNotificationsService {
  private subscripcions: { [key: string]: any[] } = {};

  constructor() {
    webPush.setVapidDetails(
      'mailto:mpanizzo@octopus.com.ar',
      vapid.publicKey,
      vapid.privateKey,
    );
  }

  hasSubscription(userId) {
    let result = false;
    if (this.subscripcions[userId]) {
      if (this.subscripcions[userId].length > 0) {
        result = true;
      }
    }

    return result;
  }

  save(subscription: any, userId) {
    if (!this.subscripcions[userId]) {
      this.subscripcions[userId] = [];
    }
    this.subscripcions[userId].push(subscription);
  }

  notify(notification: Notification, user: User) {
    if (!this.subscripcions[user.id]) {
      return;
    }

    this.subscripcions[user.id].forEach(subscription => {
      webPush.sendNotification(
        subscription,
        JSON.stringify({
          title: notification.title,
          message: notification.message,
        }),
      );
    });
  }
}
