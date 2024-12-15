import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GroupDto, TransferGroupDto } from '@group-chat/shared-data';
import { GroupService } from './groups.service';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get(':id')
  public async getUserGroups(@Param('id') userId: number): Promise<GroupDto[]> {
    return this.groupService.getUserGroups(userId);
  }

  @Put('addGroup')
  public async createNewGroup(
    @Body() transferDto: TransferGroupDto
  ): Promise<GroupDto> {
    Logger.log('enter create group on backend');
    return this.groupService.createNewGroup(transferDto);
  }
  @Put('leaveGroup')
  public async leaveGroup(
    @Body() transferDto: { groupId: number; userId: number }
  ): Promise<number> {
    return this.groupService.leaveGroup(transferDto);
  }


  @Get('getGroupName/:id')
  public async getGroupNameById(@Param('id') groupId: number): Promise<string> {
    return this.groupService.getGroupNameById(groupId);
  }
}
