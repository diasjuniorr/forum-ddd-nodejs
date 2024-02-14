//example of an abstract user class

import { Entity } from "./entity";

export interface UserProps {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
}
export abstract class User<Props extends UserProps> extends Entity<Props> {
  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }
}
