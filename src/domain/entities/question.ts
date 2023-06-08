import { Slug } from "./value-objects/slug";
import { Entity } from "../core/entities/entity";
import { UniqueEntityId } from "../core/entities/unique-entity-id";

interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  get title(): string {
    return this.props.title;
  }

  get content(): string {
    return this.props.content;
  }

  get authorId(): string {
    return this.props.authorId.toString();
  }

  get slug(): string {
    return this.props.slug.value;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
}
