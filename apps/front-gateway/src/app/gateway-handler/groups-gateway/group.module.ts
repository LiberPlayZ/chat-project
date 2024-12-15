import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GroupGatewayController } from './groups-gateway.controller';
import { GroupsGatewayService } from './groups-gateway.service';
import { SharedDataModule } from '@group-chat/shared-data';

@Module({
  imports: [HttpModule, SharedDataModule],
  providers: [GroupsGatewayService],
  controllers: [GroupGatewayController],
})
export class GroupModule {}
