import { describe, test, it, expect } from 'vitest';
import { AuthenticationClass } from '../src/app/authentication-class-handler/authentication.class';
describe('checkPepper', () => {
  it('should return true', () => {
    const auth_class = new AuthenticationClass(3, 'abc');
    expect(
      auth_class.checkPepper(
        'dshto1303L',
        'FfB8ASbwldmDVdH1OUyweOpOVEQOEocWHnawElYQHXgnyim8Qj/Tax6uGKEY/ALaWL6+wADv',
        'b71c1039c0a48d3e458f23edb36e191376d39b31c6c9808ef3eb61865fb7b10d'
      )
    ).toBe(true);
  });

  it('should return false', () => {
    const auth_class = new AuthenticationClass(3, 'abc');
    expect(
      auth_class.checkPepper(
        'dshto1303D',
        'FfB8ASbwldmDVdH1OUyweOpOVEQOEocWHnawElYQHXgnyim8Qj/Tax6uGKEY/ALaWL6+wADv',
        'b71c1039c0a48d3e458f23edb36e191376d39b31c6c9808ef3eb61865fb7b10d'
      )
    ).toBe(false);
  });
  it('should return true', () => {
    const auth_class = new AuthenticationClass(3, 'bac');
    expect(
      auth_class.checkPepper(
        'dshto1303L',
        'FfB8ASbwldmDVdH1OUyweOpOVEQOEocWHnawElYQHXgnyim8Qj/Tax6uGKEY/ALaWL6+wADv',
        'b71c1039c0a48d3e458f23edb36e191376d39b31c6c9808ef3eb61865fb7b10d'
      )
    ).toBe(true);
  });
});
