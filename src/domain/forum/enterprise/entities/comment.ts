import { Entity } from "../../../core/entities/entity";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { Optional } from "../../../core/types/optional";

export interface CommentProps {
  authorId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export abstract class Comment<
  Props extends CommentProps
> extends Entity<Props> {
  get authorId(): string {
    return this.props.authorId.toString();
  }

  get content(): string {
    return this.props.content;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt || null;
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  touch(): void {
    this.props.updatedAt = new Date();
  }
}
