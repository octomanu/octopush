import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class ConectionService {
  private conectionsBag: { [key: string]: boolean } = {};
  private usersBag: { [key: string]: string[] } = {};
  private administrationsBag: { [key: string]: string[] } = {};
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

  registerUser(userId, administrationId, clientId: string) {
    if (!this.usersBag[userId]) {
      this.usersBag[userId] = [];
    }

    if (!this.administrationsBag[administrationId]) {
      this.administrationsBag[administrationId] = [];
    }

    if (this.usersBag[userId].indexOf(clientId) === -1) {
      this.usersBag[userId].push(clientId);
    }

    if (this.administrationsBag[administrationId].indexOf(clientId) === -1) {
      this.administrationsBag[administrationId].push(clientId);
    }
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
