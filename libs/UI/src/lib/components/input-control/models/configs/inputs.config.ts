import { Validators } from '@angular/forms';
import { InputKey } from '../enums/input-key.enum';
import { InputObject } from '../types/input.type';
import {
  hasOnlyLetters,
  hasPasswordValid,
  hasIdValid,
} from '../validators/custom-validations';

export const AllInputs: InputObject = {
  [InputKey.UserName]: {
    label: 'User-Name',
    controlKey: 'username',
    validators: [Validators.required],
  },
  [InputKey.Name]: {
    label: 'Name',
    controlKey: 'name',
    validators: [Validators.required, hasOnlyLetters],
  },
  [InputKey.IdNumber]: {
    label: 'Id-Number',
    controlKey: 'idNumber',
    validators: [Validators.required, hasIdValid],
  },
  [InputKey.Age]: {
    label: 'Age',
    controlKey: 'age',
    type: 'number',
    validators: [Validators.required],
  },
  [InputKey.Email]: {
    label: 'Email',
    controlKey: 'email',
    type: 'email',
    validators: [Validators.required, Validators.email],
  },
  [InputKey.Password]: {
    label: 'Password',
    controlKey: 'password',
    type: 'password',
    validators: [Validators.required, hasPasswordValid],
  },
  [InputKey.Description]: {
    label: 'Description',
    controlKey: 'description',
    validators: [Validators.required],
  },
};
