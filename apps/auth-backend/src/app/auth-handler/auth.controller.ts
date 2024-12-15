import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { filter } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginDTO, UserDTO } from '@group-chat/shared-data';
import { UserStore } from '../../app/shared/interfaces/ngrx-store-user.interface';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async createUser(
    @Body() userDto: UserDTO
  ): Promise<{ user: UserStore; userId: number }> {
    const response = await this.authService.createNewUser(userDto);

    return response;
  }
  @Post('login')
  public async checkLogin(
    @Body() loginDto: LoginDTO
  ): Promise<{ user: UserStore; token: string }> {
    return await this.authService.checkLogin(loginDto);
  }

  @Post('token')
  public async checkToken(@Body() token: { token: string }): Promise<boolean> {
    return await this.authService.checkToken(token.token);
  }

  @Post('getId')
  public async getIdByToken(@Body('token') token: string): Promise<number> {
    return this.authService.getIdByToken(token);
  }
}
