export interface GroupDto {
  id?: number;
  name: string;
  description: string;
  managerUserId?: number;
  users?: number[];
  group_messages?: number[];
}
