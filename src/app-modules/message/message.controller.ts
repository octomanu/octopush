import { Controller, Body, Post } from '@nestjs/common';
import { SendMessageDto } from './send-message.dto';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ConectionService } from '../../gateway';

@Controller('message')
export class MessageController {
  @WebSocketServer() server: Server;

  constructor(private readonly socketConections: ConectionService) {}

  @Post()
  sendMessage(@Body() message: SendMessageDto) {
    console.log('emiting message:', message);
    
    this.socketConections.server
      .in(`adm-${message.idAdm}`)
      .emit('[ADM] message', message);
  }
}
