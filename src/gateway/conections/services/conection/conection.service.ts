import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class ConectionService {
  private conectionsBag: { [key: string]: boolean } = {};
  private socketServer: Server;

  set server(socketServer: Server) {
    this.socketServer = socketServer;
  }

  get server(): Server {
    return this.socketServer;
  }

  get conections() {
    return { ...this.conectionsBag };
  }

  add(id: string) {
    this.conectionsBag[id] = true;
  }

  remove(id: string) {
    delete this.conectionsBag[id];
  }

  exist(id: string) {
    return this.conectionsBag.hasOwnProperty(id);
  }
}
