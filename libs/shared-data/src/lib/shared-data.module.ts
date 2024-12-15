import { Module } from '@nestjs/common';
import { TokenPipe, TokenService } from './nest-shared';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TokenPipe, TokenService],
  exports: [TokenService],
})
export class SharedDataModule {}
