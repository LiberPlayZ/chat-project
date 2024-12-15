import { Injectable, PipeTransform, Logger } from '@nestjs/common';
import { TokenService } from '../services';
import { Request } from 'express';
@Injectable()
export class TokenPipe implements PipeTransform {
  constructor(private readonly service: TokenService) {}
  async transform(request: Request) {
    const token = request.headers['token'];
    if (token) {
      let response = await this.service.getIdByToken(String(token));
      return response;
    }
    return -1;

    // return token;
  }
}
