import { Injectable, Logger } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';

export class AuthenticationClass {
  private readonly saltLen = 72;
  private readonly pepperLen$: number;
  private readonly pepperOptions$: string;
  constructor(private pepperLen: number, private pepperOptions: string) {
    this.pepperLen$ = this.pepperLen;
    this.pepperOptions$ = this.pepperOptions;
  }

  private generateSalt(): string {
    return randomBytes(54).toString('base64').slice(0, this.saltLen);
  }

  private generatePepper(): string {
    const optionsLen = this.pepperOptions$.length;
    let pepper = '';
    for (let i = 0; i < this.pepperLen$; i++) {
      pepper += this.pepperOptions$.at(Math.floor(Math.random() * optionsLen));
    }

    return pepper;
  }

  private createHashPassword(
    password: string,
    salt: string,
    pepper: string
  ): string {
    return createHash('sha256')
      .update(password + salt + pepper)
      .digest('hex');
  }
  public generateToken(email: string, salt: string): string {
    return createHash('sha256')
      .update(email + salt)
      .digest('hex');
  }
  public authUser(email: string, password: string) {
    let salt = this.generateSalt();
    let pepper = this.generatePepper();
    let hashPassword = this.createHashPassword(password, salt, pepper);
    let token = this.generateToken(email, salt);
    return { hashPassword: hashPassword, token: token, salt: salt };
  }

  private generatePepperCombinations(
    password: string,
    salt: string,
    currentPepper: string,
    resultPass: string
  ): boolean {
    if (currentPepper.length === this.pepperLen) {
      return (
        this.createHashPassword(password, salt, currentPepper) === resultPass
      );
    }

    for (const c of this.pepperOptions$) {
      if (
        this.generatePepperCombinations(
          password,
          salt,
          currentPepper + c,
          resultPass
        )
      ) {
        return true;
      }
    }
    return false;
  }
  public checkPepper(password: string, salt: string, resultPass: string) {
    return this.generatePepperCombinations(password, salt, '', resultPass);
  }
}
