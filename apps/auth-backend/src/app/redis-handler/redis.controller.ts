import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';

import { RedisTokensServer } from './redis-tokens-handler.service';

@Controller('cache')
export class RedisCacheController {
  constructor(private readonly redisServer: RedisTokensServer) {}

  @Post()
  public async setCache(
    @Body('key') key: string,
    @Body('value') value: any
  ): Promise<void> {
    await this.redisServer.setValue(key, value);
    Logger.log(`Key ${key} set successfully!`);
  }

  @Get(':key')
  public async getCache(@Param('key') key: string): Promise<any | null> {
    return await this.redisServer.getValue(key);
  }

  @Delete(':key')
  public async deleteCache(@Param('key') key: string): Promise<number> {
    Logger.log(`Key ${key} deleted successfully!`);
    return this.redisServer.deleteValue(key);
  }
}
