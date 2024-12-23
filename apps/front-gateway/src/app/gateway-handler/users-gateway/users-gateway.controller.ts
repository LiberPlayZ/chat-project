import { Body, Controller, Get, Logger, Post, Req, Res } from '@nestjs/common';
import { UsersGatewayService } from './users-gateway.service';
import { LoginDTO, UserDTO, TokenPipe, ReqDec } from '@group-chat/shared-data';
import { MultiSelectInterface } from '@ui-components';
import { Response, Request } from 'express';

@Controller('users')
export class UsersGatewayController {
  constructor(private readonly userService: UsersGatewayService) {}

  @Post('register')
  public async createUser(@Body() userDto: UserDTO): Promise<any> {
    const response = await this.userService.forwardRegister(userDto);

    return response;
  }

  @Post('login')
  public async checkLogin(
    @Body() loginDto: LoginDTO,
    @Res() res: Response
  ): Promise<any> {
    const response = await this.userService.forwardLogin(loginDto);
    if (response.token) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 1); 
      res.cookie('auth_token', response.token, {
        httpOnly: true,
        expires: expires,
      });
    }
    return res.send(response);
  }

  @Post('logout')
  public async logOut(@Res() res: Response): Promise<any> {
    Logger.log('log out');
    res.clearCookie('auth_token', {
      httpOnly: true,
    });
    return res.status(200).send({ message: 'log out ' });
  }

  @Get('getUsers')
  public async getAllUsersBesideConnected(
    @ReqDec(TokenPipe) requestUserId: number
  ): Promise<MultiSelectInterface[]> {
    const response = await this.userService.forwardGetUsersBesideConnected(
      requestUserId
    );
    return response;
  }
  @Get('isAuthenticated')
  public async isAuthenticated(@Req() request: Request): Promise<boolean> {
    const token = request.headers['token'];
    if (token) return true;
    return false;
  }
  @Get('getUserName')
  public async getUserName(
    @ReqDec(TokenPipe) requestUserId: number
  ): Promise<{ username: string }> {
    const response = await this.userService.forwardGetUsername(requestUserId);
    return response;
  }

  //   // @Get('searchedUsers')
  //   // public async findUsers(
  //   //   @Query('filter') filter: string = '',
  //   //   @Query('userId') userId: number = 0
  //   // ) {
  //   //   const users = this.userService.getFilterUsers(
  //   //     filter,
  //   //     userId
  //   //   );
  //   //   return users;
  //   // }
}
