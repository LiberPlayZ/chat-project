import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Req,
  UsePipes,
} from '@nestjs/common';
import { UserDTO, LoginDTO, TokenPipe } from '@group-chat/shared-data';
import { UserService } from './user.service';
import { MultiSelectInterface } from '@ui-components';
import { filter } from 'rxjs';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async createUser(
    @Body() data: { userDto: UserDTO; userId: number }
  ): Promise<void> {
    this.userService.createNewUser(data);
  }

  @Get()
  public async getAllUsers(): Promise<UserDTO[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  public async getAllUsersBesideConnected(
    @Param('id') userId: number
  ): Promise<MultiSelectInterface[]> {
    return this.userService.getAllUsersBesideConnected(userId);
  }

  @Get('getUserName/:id')
  public async getUsername(
    @Param('id') userId: number
  ): Promise<{ username: string }> {
    return this.userService.getUsername(userId);
  }

  // @Get('searchedUsers')
  // public async findUsers(
  //   @Query('filter') filter: string = '',
  //   @Query('userId') userId: number = 0
  // ) {
  //   const users = this.userService.getFilterUsers(
  //     filter,
  //     userId
  //   );
  //   return users;
  // }
}
