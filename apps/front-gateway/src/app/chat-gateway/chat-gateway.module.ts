import { Module } from '@nestjs/common';
import { ChatGateway } from './chat-socket-io/chat.gateway';
import { ChatGatewayController } from './chat-data-gateway/chat-data-gateway.controller';
import { ChatGatewayService } from './chat-data-gateway/chat-data-gateway.service';
import { HttpModule } from '@nestjs/axios';
import { SharedDataModule } from '@group-chat/shared-data';
import { RedisOnlineUsersModule } from './redis-handler/redis.module';

@Module({
  imports: [HttpModule, SharedDataModule, RedisOnlineUsersModule],
  providers: [ChatGateway, ChatGatewayService],
  controllers: [ChatGatewayController],
})
export class ChatModule {}
