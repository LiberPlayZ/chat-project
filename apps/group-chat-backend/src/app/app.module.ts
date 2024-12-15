import { Module } from '@nestjs/common';
import { UserModule } from './user-handler/user.module';
import { PgModule } from './shared/modules/pg.module';
import { GroupModule } from './groups-handler/groups.module';
import {ConfigModule} from '@nestjs/config';
import { ChatModule } from './chat-handler/chat.module';
@Module({
  imports: [ConfigModule.forRoot(),UserModule, GroupModule,ChatModule],
})
export class AppModule {}
