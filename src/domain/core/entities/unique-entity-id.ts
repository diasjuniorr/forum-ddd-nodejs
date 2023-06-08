import { randomUUID } from "crypto";

export class UniqueEntityId {
  private readonly _value: string;

  toString(): string {
    return this._value;
  }

  get value(): string {
    return this._value;
  }

  constructor(value?: string) {
    this._value = value ?? randomUUID();
  }
}
