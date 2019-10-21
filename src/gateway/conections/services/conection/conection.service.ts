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
    this.pushUserBag(userId, clientId);
    this.pushAdministrtionBag(administrationId, clientId);
  }

  add(id: string) {
    this.conectionsBag[id] = true;
  }

  remove(id: string) {
    for (const key in this.usersBag) {
      if (this.usersBag[key].indexOf(id) !== -1) {
        delete this.usersBag[key];
      }
    }

    delete this.conectionsBag[id];
  }

  exist(id: string) {
    return this.conectionsBag.hasOwnProperty(id);
  }

  getUserConection(userId: number): any[] {
    return this.usersBag[userId] ? this.usersBag[userId] : [];
  }

  private pushUserBag(userId, clientId) {
    if (!this.usersBag[userId]) {
      this.usersBag[userId] = [];
    }
    if (this.usersBag[userId].indexOf(clientId) === -1) {
      this.usersBag[userId].push(clientId);
    }
  }

  private pushAdministrtionBag(administrationId, clientId) {
    if (!this.administrationsBag[administrationId]) {
      this.administrationsBag[administrationId] = [];
    }

    if (this.administrationsBag[administrationId].indexOf(clientId) === -1) {
      this.administrationsBag[administrationId].push(clientId);
    }
  }
}
