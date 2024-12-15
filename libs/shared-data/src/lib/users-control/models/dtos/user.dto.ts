import {
  IsString,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsPositive,
  Length,
} from 'class-validator';

import { InputKey } from '@ui-components/lib/components/input-control/models/enums';
import { Type } from 'class-transformer';
export class UserDTO {
  id?: number;
  @IsString()
  @IsNotEmpty()
  [InputKey.UserName]!: string;

  @IsNotEmpty()
  @IsString()
  [InputKey.Name]!: string;

  @Length(9, 9)
  @IsNotEmpty()
  @IsString()
  [InputKey.IdNumber]!: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Min(18)
  @Max(120)
  [InputKey.Age]!: number;

  @IsNotEmpty()
  @IsString()
  [InputKey.Email]!: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  [InputKey.Password]!: string;

  [InputKey.ROLE]?: string;

  groups!: number[];
}
