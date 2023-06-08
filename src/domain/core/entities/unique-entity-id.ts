import { randomUUID } from "crypto";

export class UniqueEntityId {
  private _value: string;

  toString(): string {
    return this._value;
  }

  get toValue(): string {
    return this._value;
  }

  constructor(value?: string) {
    this._value = value ?? randomUUID();
  }
}
