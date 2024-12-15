import { TransferGroupDto } from '@group-chat/shared-data';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GroupsGatewayService {
  private mainUrl = `${process.env.API_URL}:${process.env.MAIN_PORT}/api`;
  constructor(private httpService: HttpService) {}

  public async forwardGetUserGroups(userId: number) {
    try {
      const response = await this.httpService
        .get(`${this.mainUrl}/groups/${userId}`)
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

  public async forwardCreateNewGroup(transferDto: TransferGroupDto) {
    Logger.log('making create group request' );
    try {
      const url = this.mainUrl + `/groups/addGroup`;
      const response = await this.httpService.put(url, transferDto).toPromise();

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

  public async forwardLeaveGroup(transferDto: {
    groupId: number;
    userId: number;
  }) {
    Logger.log('making leave group request' );
    try {
      const url = this.mainUrl + `/groups/leaveGroup`;
      const response = await this.httpService.put(url, transferDto).toPromise();

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
