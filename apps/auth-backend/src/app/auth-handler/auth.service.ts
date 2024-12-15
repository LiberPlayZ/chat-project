import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PgService } from '../shared/services/pg.service';
import { LoginDTO, UserDTO } from '@group-chat/shared-data';
import { UserStore } from '../../app/shared/interfaces/ngrx-store-user.interface';

import {
  addUserQuery,
  checkEmailExistQuery,
  checkUserExistQuery,
  updatePasswordAndSalt,
} from './auth.queries';
import { AuthenticationClass } from '../authentication-class-handler/authentication.class';
import { RedisTokensServer } from '../redis-handler/redis-tokens-handler.service';

@Injectable()
export class AuthService {
  private authClass: AuthenticationClass;

  constructor(
    private readonly pgService: PgService,
    private redisServer: RedisTokensServer
  ) {
    this.authClass = new AuthenticationClass(
      Number(process.env.PEPPER_LEN),
      process.env.PEPPER_OPTIONS
    );
  }

  public async createNewUser(
    userDTO: UserDTO
  ): Promise<{ user: UserStore; userId:number}> {
    return new Promise(async (resolve, reject) => {
      //check if id or username is exist

      const isUserExist = await this.pgService.authQuery(checkUserExistQuery, [
        userDTO.username,
        userDTO.idNumber,
        userDTO.email,
      ]);

      if (+isUserExist.rows[0].count > 0) {
        return reject(
          new ConflictException(
            'user with the same id or username already exist'
          )
        );
      }
      const auth_data = this.authClass.authUser(
        userDTO.email,
        userDTO.password
      );
      const createdUser = await this.pgService.authQuery(addUserQuery, [
        userDTO.username,
        userDTO.idNumber,
        'user',
        userDTO.email,
        auth_data.hashPassword,
        auth_data.salt,
      ]);

      resolve({
        user: {
          username: userDTO.username,
        },

        userId: createdUser.rows[0].id,
      });
    });
  }
  public async checkLogin(
    loginDTO: LoginDTO
  ): Promise<{ user: UserStore; token: string }> {
    debugger;
    return new Promise(async (resolve, reject) => {
      const isEmailExist = await this.pgService.authQuery(
        checkEmailExistQuery,
        [loginDTO.email]
      );

      if (!(isEmailExist.rows.length > 0)) {
        return reject(
          new UnauthorizedException('email is not exist . register first!!')
        );
      }
      const user = isEmailExist.rows[0];
      const pass = user.password;
      const salt = user.salt;
      if (this.authClass.checkPepper(loginDTO.password, salt, pass)) {
        let data = this.authClass.authUser(loginDTO.email, loginDTO.password);
        await this.pgService.authQuery(updatePasswordAndSalt, [
          data.hashPassword,
          data.salt,
          user.id,
        ]);

        await this.redisServer.deleteOldUserTokens(user.id); //delete older tokens

        await this.redisServer.setValue(
          data.token,
          JSON.stringify({
            id: user.id,
            role: user.role,
          })
        );
        resolve({
          user: { username: user.username },
          token: data.token,
        });
      }

      return reject(new UnauthorizedException('invalid credentials!'));
    });
  }

  public async checkToken(token: string): Promise<boolean> {
    let checkToken = await this.redisServer.getValue(token);
    let jsonConvert = JSON.parse(checkToken);
    if (jsonConvert == null) return false;
    Logger.log('token is valid');
    return true;
  }

  public async getIdByToken(token: string): Promise<number> {
    let checkToken = await this.redisServer.getValue(token);
    let jsonConvert = JSON.parse(checkToken);
    return jsonConvert.id;
  }
}
