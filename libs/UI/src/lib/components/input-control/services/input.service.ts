import { Injectable } from '@angular/core';
import { InputKey } from '../models/enums/input-key.enum';
import { InputControl } from '../models/interfaces/input-control.interface';
import { AllInputs } from '../models/configs/inputs.config';

@Injectable()
export class InputService {
  getAllItems(): InputControl[] {
    // function to get all the values from the object .
    return Object.values(AllInputs);
  }

  getItemsByKeys(keys: InputKey[]): InputControl[] {
    // function to get items from the  object  by array of keys
    if (keys.length === Object.keys(AllInputs).length) {
      return this.getAllItems();
    }
    let inputsArray: InputControl[] = [];
    for (let index = 0; index < keys.length; index++) {
      inputsArray.push(AllInputs[keys[index]]!);
    }
    return inputsArray;
  }



}
