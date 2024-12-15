import { Module } from '@nestjs/common';
import { GroupController } from './groups.controller';
import { GroupService } from './groups.service';
import { PgModule } from '../shared/modules/pg.module';

@Module({
  imports: [PgModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
