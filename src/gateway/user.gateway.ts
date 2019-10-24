import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { ConectionService } from './conections';
import { Server, Socket } from 'socket.io';
import { UserRepo } from '../entities/repository';

@WebSocketGateway()
export class UserGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly conections: ConectionService, private readonly userRepo: UserRepo) { }

  @SubscribeMessage('register')
  handleEvent(client: Socket, data: any): Promise<string> {
    return this.userRepo.createOrFind({
      octopusId: data.userId,
      administrationId: data.administrationId,
    }).then(userDb => {
      console.log("user DB-", userDb);
      this.conections.registerUser(data.userId, data.administrationId, client.id);
      client.join(`[Administration-${data.administrationId}]`);
      console.log('registered user: ', client.id);
      return data;
    });
  }
}
