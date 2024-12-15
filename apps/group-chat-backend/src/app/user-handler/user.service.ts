import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { UserDTO, LoginDTO } from '@group-chat/shared-data';
import { PgService } from '../shared/services/pg.service';
import {
  addUserQuery,
  getUsernameQuery,
  getUsersBesideConnectedQuery,
} from './user.queries';
import { MultiSelectInterface } from '@ui-components';
@Injectable()
export class UserService {
  constructor(private readonly pgService: PgService) {}

  public async createNewUser(data: {
    userDto: UserDTO;
    userId: number;
  }): Promise<void> {
    this.pgService.mainQuery(addUserQuery, [
      data.userId,
      data.userDto.username,
      data.userDto.name,
      data.userDto.age,
    ]);
  }

  public async getAllUsers(): Promise<UserDTO[]> {
    return [];
  }

  public async getAllUsersBesideConnected(
    userId: number
  ): Promise<MultiSelectInterface[]> {
    return new Promise(async (resolve, reject) => {
      let result = await this.pgService.mainQuery(
        getUsersBesideConnectedQuery,
        [userId]
      );
      resolve(result.rows);
    });
  }

  public async getUsername(userId: number): Promise<{ username: string }> {
    return new Promise(async (resolve, reject) => {
      let result = await this.pgService.mainQuery(getUsernameQuery, [userId]);
      resolve(result.rows[0]);
    });
  }

  // public async getFilterUsers(
  //   filter: string,
  //   userId: number
  // ): Promise<MultiSelectInterface[]> {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(async () => {
  //       const values = [`%${filter}%`, userId];
  //       Logger.log('values ' + values);
  //       let result = await this.pgService.query(getUsersByFilterQuery, values);
  //       resolve(result.rows);
  //     });
  //   });
  // }
}
