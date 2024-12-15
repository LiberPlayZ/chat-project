import { InputControl } from '../interfaces/input-control.interface';
import { InputKey } from '../enums/input-key.enum';

export type InputObject = {
  [key in InputKey]?: InputControl;
};
