import { Module } from '@nestjs/common';
import { PgService } from '../services/pg.service';

@Module({
  providers: [PgService],
  exports: [PgService],
})
export class PgModule {}
