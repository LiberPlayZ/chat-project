import { GroupDto } from './group.dto';

export interface TransferGroupDto {
  group: GroupDto;
  manager_user: number;
}
