import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ToastService, ToastSeverity } from '@ui-components';
import { Request, Response, NextFunction } from 'express';
import { UsersGatewayService } from '../users-gateway/users-gateway.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userService: UsersGatewayService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (
      req.path === '/api/users/login' ||
      req.path === '/api/users/register' ||
      req.path === '/api/users/logout' 
    ) {
      return next();
    }
    const token = req.cookies['auth_token'];
    Logger.log('token  ' + token);
    if (token) {
      const response = await this.userService.checkTokenRequest(token);

      if (response == true) {
       req.headers['token'] = token; 
        next();
      } else {
        return res
          .status(401)
          .send({ message: 'Unauthorized: token is invalid' });
      }
    } else {
      return res
        .status(401)
        .send({ message: 'Unauthorized: No token provide' });
    }
  }
}
