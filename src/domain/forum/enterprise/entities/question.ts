import { Slug } from "./value-objects/slug";
import { Entity } from "../../../core/entities/entity";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { Optional } from "../../../core/types/optional";

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

  get bestAnswerId(): UniqueEntityId | undefined {
    return this.props.bestAnswerId;
  }

  set bestAnswerId(id: UniqueEntityId | undefined) {
    this.props.bestAnswerId = id;
  }

  set title(title: string) {
    this.props.title = title;
    this.touch();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  touch(): void {
    this.props.updatedAt = new Date();
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
