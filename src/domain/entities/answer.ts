import { Entity } from "../core/entities/entity";
import { UniqueEntityId } from "../core/entities/unique-entity-id";
import { Optional } from "../core/types/optional";

interface AnswerProps {
  questionId: UniqueEntityId;
  authorId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
  get content(): string {
    return this.props.content;
  }

  get authorId(): string {
    return this.props.authorId.toString();
  }

  get questionId(): string {
    return this.props.questionId.toString();
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<AnswerProps, "createdAt">,
    id?: UniqueEntityId
  ): Answer {
    return new Answer(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );
  }
}
