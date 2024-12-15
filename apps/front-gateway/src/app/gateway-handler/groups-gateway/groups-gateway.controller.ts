import { Body, Controller, Get, Logger, Param, Put } from '@nestjs/common';
import { GroupsGatewayService } from './groups-gateway.service';
import {
  GroupDto,
  ReqDec,
  TokenPipe,
  TransferGroupDto,
} from '@group-chat/shared-data';

@Controller('groups')
export class GroupGatewayController {
  constructor(private readonly groupService: GroupsGatewayService) {}

  @Get('getUserGroups')
  public async getUserGroups(
    @ReqDec(TokenPipe) requestUserId: number
  ): Promise<GroupDto[]> {
    const response = await this.groupService.forwardGetUserGroups(
      requestUserId
    );
    return response;
  }

  @Put('addGroup')
  public async createNewGroup(
    @ReqDec(TokenPipe) requestUserId: number,
    @Body() group: GroupDto
  ): Promise<GroupDto> {
    const transferDto: TransferGroupDto = {
      group: group,
      manager_user: requestUserId,
    };
    const response = await this.groupService.forwardCreateNewGroup(transferDto);
    return response;
  }
  @Put('leaveGroup')
  public async leaveGroup(
    @ReqDec(TokenPipe) requestUserId: number,
    @Body() groupId: { groupId: number }
  ): Promise<number> {
    const transferDto = {
      groupId: groupId.groupId,
      userId: requestUserId,
    };
    const response = await this.groupService.forwardLeaveGroup(transferDto);
    return response;
  }
}
