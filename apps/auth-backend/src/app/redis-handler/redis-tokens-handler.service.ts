import { Inject, Injectable, Logger } from '@nestjs/common';

import { REDIS_CLIENT } from './redis.provider';
import { Redis } from 'ioredis';

// db 0 : for tokens

@Injectable()
export class RedisTokensServer {
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {
    this.redisClient.select(0);
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

  public async deleteOldUserTokens(userId: number): Promise<void> {
    let cursor = '0';
    let keysToDelete: string[] = [];
    do {
      const [nextCursor, keys] = await this.redisClient.scan(
        cursor,
        'MATCH',
        '*',
        'COUNT',
        10
      );
      cursor = nextCursor;
      if (keys.length > 0) {
        const pipeline = this.redisClient.pipeline();

        keys.forEach((key) => pipeline.get(key));
        const values = await pipeline.exec();

        keys.forEach((key, index) => {
          const value = values[index][1];

          if (value && typeof value === 'string') {
            try {
              const parseValue = JSON.parse(value);
              if (parseValue.id === userId) {
                keysToDelete.push(key);
              }
            } catch (error) {
              console.error('error parsing');
            }
          }
        });
      }
    } while (cursor !== '0');

    if (keysToDelete.length > 0) {
      const pipeline = this.redisClient.pipeline();
      keysToDelete.forEach((key) => pipeline.del(key));
      await pipeline.exec();

      Logger.log(
        `Deleted ${keysToDelete.length} older tokens for user id: ${userId} `
      );
    } else {
      Logger.log(`No old tokens found for  user id: ${userId}`);
    }
  }
}
