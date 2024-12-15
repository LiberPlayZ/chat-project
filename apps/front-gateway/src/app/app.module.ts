import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './gateway-handler/middlewares/auth-middleware';
import { UserModule } from './gateway-handler/users-gateway/users.module';
import { GroupModule } from './gateway-handler/groups-gateway/group.module';
import { ChatModule } from './chat-gateway/chat-gateway.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, GroupModule, ChatModule],
  providers: [AuthMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/api/users/login', method: RequestMethod.POST })
      .exclude({ path: '/api/users/register', method: RequestMethod.POST })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
