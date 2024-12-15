import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ChatGatewayService } from './chat-data-gateway.service';
import { MessageDto, ReqDec, TokenPipe } from '@group-chat/shared-data';

@Controller('chat')
export class ChatGatewayController {
  constructor(private readonly chatService: ChatGatewayService) {}

  @Get('getGroupMessages/:id')
  public async getAllUsersBesideConnected(
    @ReqDec(TokenPipe) requestUserId: number,
    @Param('id') groupId: number
  ): Promise<{ senderUsername: string; messages: MessageDto[] }> {
    const response = await this.chatService.forwardGetGroupMessages(
      groupId,
      requestUserId
    );
    return response;
  }

  @Post('addMessage')
  public async addMessage(
    @ReqDec(TokenPipe) requestUserId: number,
    @Body() messageDto: MessageDto
  ): Promise<MessageDto> {
    let transferMessage: MessageDto = {
      ...messageDto,
      userId: requestUserId,
    };
    const response = await this.chatService.forwardAddMessage(transferMessage);
    return response;
  }
}
