import { Module } from '@nestjs/common';
import { DefaultGateway } from './default.gateway';
import { ConectionsModule } from './conections';

@Module({
  imports: [ConectionsModule],
  providers: [DefaultGateway],
  exports: [DefaultGateway],
})
export class GatewayModule {}
