import { Validators } from '@angular/forms';

export interface InputControl {
  label?: string;
  type?: string;
  controlKey: string;
  validators?: Validators[];
}
