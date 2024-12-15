import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersGatewayController } from './users-gateway.controller';
import { UsersGatewayService } from './users-gateway.service';
import { SharedDataModule } from '@group-chat/shared-data';

@Module({
  imports: [HttpModule, SharedDataModule],
  providers: [UsersGatewayService],
  controllers: [UsersGatewayController],
  exports: [UsersGatewayService],
})
export class UserModule {}
