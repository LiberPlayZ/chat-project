import { LoginDTO, UserDTO } from '@group-chat/shared-data';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UsersGatewayService {
  private mainUrl = `${process.env.API_URL}:${process.env.MAIN_PORT}/api`;
  private authUrl = `${process.env.API_URL}:${process.env.AUTH_PORT}/api`;
  constructor(private httpService: HttpService) {}

  public async forwardRegister(data: UserDTO) {
    try {
      const response = await this.httpService
        .post(`${this.authUrl}/users/register`, data)
        .toPromise();

      await this.httpService
        .post(`${this.mainUrl}/users/register`, {
          userDto: data,
          userId: response.data.userId,
        })
        .toPromise();

      return response.data;
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        const errorMessage = data.message || 'error occurred';

        throw new HttpException(
          {
            message: errorMessage,
          },
          status
        );
      }
    }
  }

  public async forwardLogin(data: LoginDTO) {
    try {
      const response = await this.httpService
        .post(`${this.authUrl}/users/login`, data)
        .toPromise();

      return response.data;
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        const errorMessage = data.message || 'error occurred';

        throw new HttpException(
          {
            message: errorMessage,
          },
          status
        );
      }
    }
  }

  public async forwardLogout() {}

  public async checkTokenRequest(token: string) {
    try {
      const response = await this.httpService
        .post(`${this.authUrl}/users/token`, { token: token })
        .toPromise();

      return response.data;
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        const errorMessage = data.message || 'error occurred';

        throw new HttpException(
          {
            message: errorMessage,
          },
          status
        );
      }
    }
  }

  public async forwardGetUsersBesideConnected(userId: number) {
    try {
      const response = await this.httpService
        .get(`${this.mainUrl}/users/${userId}`)
        .toPromise();

      return response.data;
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        const errorMessage = data.message || 'error occurred';

        throw new HttpException(
          {
            message: errorMessage,
          },
          status
        );
      }
    }
  }

  public async forwardGetUsername(userId: number) {
    try {
      const response = await this.httpService
        .get(`${this.mainUrl}/users/getUserName/${userId}`)
        .toPromise();
      return response.data;
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        const errorMessage = data.message || 'error occurred';

        throw new HttpException(
          {
            message: errorMessage,
          },
          status
        );
      }
    }
  }
}
