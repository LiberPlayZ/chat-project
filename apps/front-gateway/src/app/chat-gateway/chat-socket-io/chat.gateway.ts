import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';

import { Logger } from '@nestjs/common';

import { Server, Socket } from 'socket.io';
import { MessageDto } from '@group-chat/shared-data';
import { ChatGatewayService } from '../chat-data-gateway/chat-data-gateway.service';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;
  private logger: Logger = new Logger('chatGateway');

  constructor(private service: ChatGatewayService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected : ${client.id}`);
    if (client.handshake.headers['cookie']) {
      let cookiesArray = client.handshake.headers['cookie'].split('=');
      const res = this.service.forwardSetOnlineUser(cookiesArray[1], client.id);
    }
  }

  afterInit(server: Server) {
    this.logger.log(`WebSocket gateway initialized`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected : ${client.id}`);
  }

  @SubscribeMessage('joinGroup')
  handleJoinGroup(
    @ConnectedSocket() client: Socket,
    @MessageBody() groupId: string
  ) {
    client.join(groupId);
    console.log(`CLient ${client.id} join the room ${groupId} `);
    return { success: true, groupId };
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessageToGroup(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: MessageDto
  ) {
    const groupName = await this.service.forwardGetGroupName(message.groupId);

    this.server
      .to(String(message.groupId))
      .except(client.id)
      .emit('newMessages', { message: message, groupName: groupName });
    console.log(
      `CLient ${client.id} send a message to  room ${message.groupId} `
    );
    return { success: true };
  }

  @SubscribeMessage('onTyping')
  handleOnTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sender: string; groupId: number }
  ) {
    this.server
      .to(String(data.groupId))
      .except(client.id)
      .emit('OnTyping', data);
    return { success: true };
  }

  @SubscribeMessage('updateInGroupUsers')
  async handleUpdateInGroupUsers(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      updateInGroup: number[];
      groupName: string;
    }
  ) {
    const sockets = await this.service.getSocketsId(data.updateInGroup);

    sockets.forEach((userId, index) => {
      const value = sockets[index][1];

      this.server
        .to(value as string)
        .emit('updateInGroupUsers', data.groupName);
    });
    return { success: true };
  }
}
