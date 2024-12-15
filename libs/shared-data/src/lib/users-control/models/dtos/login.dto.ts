import { IsString, IsNotEmpty, Length } from 'class-validator';
import { InputKey } from '../../../../../../UI/src/lib/components/input-control/models/enums/input-key.enum';
export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  [InputKey.Email]!: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  [InputKey.Password]!: string;
}
