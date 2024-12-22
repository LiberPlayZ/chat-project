export interface MessageDto {
  id?: number;
  text: string;
  userId?: number;
  username: string;
  groupId: number;
  date: Date;
  image?: string | null
}
