import { HttpException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class TokenService {
  private authUrl = `http://localhost:6000/api`;

  constructor(private httpService: HttpService) {}
  public async getIdByToken(token: string): Promise<number> {
    return await this.httpService
      .post(`${this.authUrl}/users/getId/`, { token: token })
      .toPromise()
      .then((res) => {
        if (res?.data == undefined) {
          let errorMessage = 'User token not found';
          throw new HttpException(
            {
              message: errorMessage,
            },
            401
          );
        }

        return res.data;
      })
      .catch((error) => {
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
      });
  }
}
