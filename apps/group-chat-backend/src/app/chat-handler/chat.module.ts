import { Module } from '@nestjs/common';
import { PgModule } from '../shared/modules/pg.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [PgModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
