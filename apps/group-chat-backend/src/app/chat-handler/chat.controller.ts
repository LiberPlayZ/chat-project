import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageDto } from '@group-chat/shared-data';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('getGroupMessages/:groupId/:userId')
  public async getGroupMessages(
    @Param('groupId') groupId: number,
    @Param('userId') userId: number
  ): Promise<{ senderUsername: string; messages: MessageDto[] }> {
    return this.chatService.getGroupMessages(groupId, userId);
  }
  @Post('addMessage')
  public async addMessage(@Body() messageDto: MessageDto): Promise<MessageDto> {
    return this.chatService.addMessage(messageDto);
  }
}
