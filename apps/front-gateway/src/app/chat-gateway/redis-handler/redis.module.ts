import { Module } from '@nestjs/common';
import { redisProvider } from './redis.provider';
import { RedisOnlineUsersServer } from './redis-online-users.service';

@Module({
  controllers: [],
  providers: [redisProvider, RedisOnlineUsersServer],
  exports: [RedisOnlineUsersServer],
})
export class RedisOnlineUsersModule {}
