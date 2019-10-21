import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { ConectionService } from './conections';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class DefaultGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(private readonly conections: ConectionService) {}

  handleConnection(client: Socket, ...args: any[]) {
    this.conections.add(client.id);
    console.log('on: ', this.conections.conections);
  }

  handleDisconnect(client: Socket) {
    this.conections.remove(client.id);
    console.log('off: ', this.conections.conections);
  }

  afterInit(server: any) {
    this.conections.server = server;
    console.log('init default: ');
  }
}
