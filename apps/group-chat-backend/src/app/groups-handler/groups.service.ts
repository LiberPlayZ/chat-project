import { GroupDto, TransferGroupDto } from '@group-chat/shared-data';
import { Injectable, Logger } from '@nestjs/common';
import { PgService } from '../shared/services/pg.service';
import {
  addGroupQuery,
  addGroupToUserQuery,
  deleteGroupQuery,
  deleteUserFromGroupQuery,
  getGroupNameByIdQuery,
  getUserGroupsQuery,
  leaveGroupToUserQuery,
} from './groups.queries';

@Injectable()
export class GroupService {
  constructor(private readonly pgService: PgService) {}

  public async getUserGroups(userId: number): Promise<GroupDto[]> {
    return new Promise(async (resolve, reject) => {
      let result = await this.pgService.mainQuery(getUserGroupsQuery, [userId]);
      resolve(result.rows);
    });
  }
  

  public async createNewGroup(
    transferDto: TransferGroupDto
  ): Promise<GroupDto> {
    return new Promise(async (resolve, reject) => {
      let users = [];
      if (!transferDto.group.users) transferDto.group.users = [];

      users = [...transferDto.group.users, transferDto.manager_user];
      transferDto.group.users = users;
      Logger.log(transferDto);
      try {
        await this.pgService.mainQuery('BEGIN');
        const newGroup = await this.pgService.mainQuery(addGroupQuery, [
          transferDto.group.name,
          transferDto.group.description,
          transferDto.manager_user,
          transferDto.group.users,
        ]);

        const newGroupId = newGroup.rows[0].id;

        for (const userId of users) {
          await this.pgService.mainQuery(addGroupToUserQuery, [
            newGroupId,
            userId,
          ]);
        }
        await this.pgService.mainQuery('COMMIT');

        resolve(newGroup.rows[0]);
      } catch (error) {
        await this.pgService.mainQuery('ROLLBACK');
        throw error;
      }
    });
  }

  public async leaveGroup(transferDto: {
    groupId: number;
    userId: number;
  }): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.pgService.mainQuery('BEGIN');

        // remove from user groups array
        await this.pgService.mainQuery(leaveGroupToUserQuery, [
          transferDto.groupId,
          transferDto.userId,
        ]);

        // remove from group users array

        const groupUsers = await this.pgService.mainQuery(
          deleteUserFromGroupQuery,
          [transferDto.userId, transferDto.groupId]
        );
        if (groupUsers.rows[0].users.length === 0) {
          Logger.log(`Delete group ${transferDto.groupId} successfully`);
          await this.pgService.mainQuery(deleteGroupQuery, [
            transferDto.groupId,
          ]);
        }
        await this.pgService.mainQuery('COMMIT');

        resolve(transferDto.groupId);
      } catch (error) {
        await this.pgService.mainQuery('ROLLBACK');
        throw error;
      }
    });
  }
  public async getGroupNameById(groupId: number): Promise<string> {
    return new Promise(async (resolve, reject) => {
      let result = await this.pgService.mainQuery(getGroupNameByIdQuery, [groupId]);
      resolve(result.rows[0].name);
    });
  }
}
