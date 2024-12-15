import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PgModule } from '../shared/modules/pg.module';
import { SharedDataModule } from '@group-chat/shared-data';

@Module({
  imports: [PgModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
