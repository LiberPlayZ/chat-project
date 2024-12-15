import { Inject, Injectable, Logger } from '@nestjs/common';

import { REDIS_CLIENT } from './redis.provider';
import { Redis } from 'ioredis';

// db 1 : for online users

@Injectable()
export class RedisOnlineUsersServer {
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {
    this.redisClient.select(1);
  }

  public async setValue(key: string, value: any): Promise<void> {
    await this.redisClient.set(key, value);
  }

  public async getValue(key: string): Promise<any | null> {
    return await this.redisClient.get(key);
  }

  public async deleteValue(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }
  public pipeline(){
    return this.redisClient.pipeline();
  }
}
