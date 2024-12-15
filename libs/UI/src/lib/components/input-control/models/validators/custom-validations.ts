import { AbstractControl } from '@angular/forms';

export function hasOnlyLetters(control: AbstractControl) {
  // function that check if the control value contains only letters.
  const value = control.value;

  if (!/[a-zA-z]+$/.test(value)) {
    return { invalidSymbols: true };
  }

  return null;
}

export function hasPasswordValid(control: AbstractControl) {
  // function that check password validation (min len = 6 , has Capital letter and special symbol)
  const value = control.value;

  if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}/.test(value)) {
    return { invalidPassword: true };
  }

  return;
}

export function hasIdValid(control: AbstractControl) {
  // function that check id validation ( len = 9, has only numbers and checking id valid )
  const value = control.value;
  let w = 1,
    sum = 0,
    currValue,
    lastDigit = +value.slice(-1);

  for (let index = 0; index < value.length - 1; index++) {
    currValue = +value[index] * w;
    sum = sum + (currValue % 10) + ((currValue / 10) >>> 0);
    w = 3 - w;
  }
  sum += lastDigit;
  if (!/^\d{9}$/.test(value) || sum % 10 !== 0) {
    return { invalidId: true };
  }

  return;
}
