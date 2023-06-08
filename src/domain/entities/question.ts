import { Slug } from "./value-objects/slug";
import { Entity } from "../core/entities/entity";
import { UniqueEntityId } from "../core/entities/unique-entity-id";
import { Optional } from "../core/types/optional";

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

  static create(
    props: Optional<QuestionProps, "createdAt">,
    id?: UniqueEntityId
  ): Question {
    return new Question(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );
  }
}
