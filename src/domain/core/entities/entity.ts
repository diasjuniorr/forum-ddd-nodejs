import { randomUUID } from "crypto";

export class Entity<Props> {
  private _id: string;
  protected props: Props;

  get id(): string {
    return this.id;
  }

  constructor(props: Props, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }
}
