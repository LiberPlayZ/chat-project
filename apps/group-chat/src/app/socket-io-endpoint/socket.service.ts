import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { io, Socket } from 'socket.io-client';
import { MessageDto } from '@group-chat/shared-data';

@Injectable()
export class SocketIoService {
  private readonly socketIoUrl = environment.APIKeys.SocketIo_API;
  private socket: Socket;
  constructor() {
    this.socket = io(this.socketIoUrl, {
      withCredentials: true,
      transports: ['websocket'],
    });
  }

  public listen(eventName: string, callback: (data: any) => void): void {
    this.socket.on(eventName, callback);
  }

  public emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  public joinGroup(groupId: string) {
    this.socket.emit('joinGroup', groupId, (response: any) => {});
  }
  public updateInGroupUsers(usersInGroup: number[], groupName: string) {
    if (usersInGroup.length > 0)
      this.socket.emit('updateInGroupUsers', {
        updateInGroup: usersInGroup,
        groupName: groupName,
      });
  }

  public sendMessage(message: any) {
    const messageDto: MessageDto = {
      id: message.id,
      text: message.text,
      userId: message.userid,
      username: message.username,
      groupId: message.groupid,
      date: message.date,
    };

    this.socket.emit('sendMessage', messageDto);
  }
  public onTypingEvent(sender: string, groupId: number) {
    this.socket.emit('onTyping', { sender: sender, groupId: groupId });
  }

  public listenForMessages(
    callback: (data: { message: MessageDto; groupName: string }) => void
  ) {
    this.socket.on('newMessages', callback);
  }

  public listenForUpdateInGroupUsers(callback: (groupName: string) => void) {
    this.socket.on('updateInGroupUsers', callback);
  }
  public listenForTyping(
    callback: (data: { sender: string; groupId: number }) => void
  ) {
    this.socket.on('OnTyping', callback);
  }
}
