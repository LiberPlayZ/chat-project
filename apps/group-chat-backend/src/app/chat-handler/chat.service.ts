import { MessageDto } from '@group-chat/shared-data';
import { Injectable, Logger } from '@nestjs/common';
import { PgService } from '../shared/services/pg.service';
import {
  addMessageQuery,
  addMessageToGroupQuery,
  getGroupMessagesQuery,
  getSenderUserNameQuery,
} from './chat.queries';

@Injectable()
export class ChatService {
  constructor(private readonly pgService: PgService) { }

  public async getGroupMessages(
    groupId: number,
    userId: number
  ): Promise<{ senderUsername: string; messages: MessageDto[] }> {
    return new Promise(async (resolve, reject) => {
      let usernameResult = await this.pgService.mainQuery(
        getSenderUserNameQuery,
        [userId]
      );
      let result = await this.pgService.mainQuery(getGroupMessagesQuery, [
        groupId,
      ]);
      resolve({
        senderUsername: usernameResult.rows[0].username,
        messages: result.rows,
      });
    });
  }

  public async addMessage(message: MessageDto): Promise<MessageDto> {
    return new Promise(async (resolve, reject) => {
      // get username of sender message by user id .
      let usernameResult = await this.pgService.mainQuery(
        getSenderUserNameQuery,
        [message.userId]
      );

      //add message to messages table and return creation id .

      let messageResult = await this.pgService.mainQuery(addMessageQuery, [
        message.text,
        message.userId,
        usernameResult.rows[0].username,
        message.groupId,
        message.date,
        message.image ? Buffer.from(message.image, 'base64') : null
      ]);

      // add the message created id to the group array of messages .

      await this.pgService.mainQuery(addMessageToGroupQuery, [
        messageResult.rows[0].id,
        message.groupId,
      ]);

      resolve(messageResult.rows[0]);
    });
  }
}
