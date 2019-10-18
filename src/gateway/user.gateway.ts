import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { ConectionService } from './conections';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class UserGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly conections: ConectionService) {}

  @SubscribeMessage('register')
  handleEvent(client: Socket, data: any): string {
    this.conections.registerUser(data.userId, data.administrationId, client.id);
    console.log('registered user: ', client.id);
    console.log(data);
    return data;
  }
}
