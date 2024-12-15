import { MessageDto } from '@group-chat/shared-data';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { RedisOnlineUsersServer } from '../redis-handler/redis-online-users.service';

@Injectable()
export class ChatGatewayService {
  private mainUrl = `${process.env.API_URL}:${process.env.MAIN_PORT}/api`;
  private authUrl = `${process.env.API_URL}:${process.env.AUTH_PORT}/api`;
  constructor(
    private httpService: HttpService,
    private redisServer: RedisOnlineUsersServer
  ) { }

  public async forwardGetGroupMessages(
    groupId: number,
    connectedUserId: number
  ) {
    try {
      const response = await this.httpService
        .get(
          `${this.mainUrl}/chat/getGroupMessages/${groupId}/${connectedUserId}`
        )
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

  public async forwardAddMessage(message: MessageDto) {
    try {
      const response = await this.httpService
        .post(`${this.mainUrl}/chat/addMessage`, message)
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
  public async forwardSetOnlineUser(token: string, socketId: string) {
    try {
      const response = await this.httpService
        .post(`${this.authUrl}/users/getId/`, { token: token })
        .toPromise();
      await this.redisServer.setValue(String(response.data), socketId);

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

  public async getSocketsId(
    users: number[]
  ): Promise<[error: Error, result: unknown][]> {
    const pipeline = this.redisServer.pipeline();
    users.forEach((userId) => {
      pipeline.get(String(userId));
    });
    const sockets = await pipeline.exec();
    return sockets;
  }

  public async forwardGetGroupName(groupId: number) {
    try {
      const response = await this.httpService
        .get(`${this.mainUrl}/groups/getGroupName/${groupId}`)
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
