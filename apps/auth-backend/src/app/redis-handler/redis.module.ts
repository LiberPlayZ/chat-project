import { Module } from '@nestjs/common';
import { redisProvider } from './redis.provider';
import { RedisCacheController } from './redis.controller';
import { RedisTokensServer } from './redis-tokens-handler.service';

@Module({
  controllers: [RedisCacheController],
  providers: [redisProvider, RedisTokensServer],
  exports: [RedisTokensServer],
})
export class RedisModule {}
