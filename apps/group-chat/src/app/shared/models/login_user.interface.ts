import { InputKey } from '@ui-components/lib/components/input-control/models/enums';

export interface LoginUser {
  [InputKey.Email]: string;
  [InputKey.Password]: string;
}
