import { Module } from "@nestjs/common";
import { PushNotificationsController } from "./push-notifications.controller";
import { NestModule } from "@nestjs/common";
import { MiddlewareConsumer } from "@nestjs/common";

@Module({
    controllers: [PushNotificationsController]
})
export class PushNotificationsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        //consumer
        //    .apply(BufferMiddleware)
        //    .forRoutes('push/key');
    }
}