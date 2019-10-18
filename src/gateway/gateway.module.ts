import { Module } from '@nestjs/common';
import { DefaultGateway } from './default.gateway';
import { ConectionsModule } from './conections';
import { UserGateway } from './user.gateway';

@Module({
  imports: [ConectionsModule],
  providers: [DefaultGateway, UserGateway],
  exports: [DefaultGateway],
})
export class GatewayModule {}
