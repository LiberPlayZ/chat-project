import { Module } from '@nestjs/common';
import { PgModule } from '../shared/modules/pg.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RedisModule } from '../redis-handler/redis.module';

@Module({
  imports: [PgModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
