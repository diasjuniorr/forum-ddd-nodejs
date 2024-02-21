import { Entity } from "../../../core/entities/entity";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { Optional } from "../../../core/types/optional";
import { AnswerAttachment } from "./answer-attachment";

export interface AnswerProps {
  questionId: UniqueEntityId;
  authorId: UniqueEntityId;
  content: string;
  attachments: AnswerAttachment[];
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

  get excerpt(): string {
    return this.props.content.substring(0, 120).trimEnd().concat("...");
  }

  get attachments(): AnswerAttachment[] {
    return this.props.attachments;
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  set questionId(questionId: UniqueEntityId) {
    this.props.questionId = questionId;
  }

  set attachments(answerAttachments: AnswerAttachment[]) {
    this.props.attachments = answerAttachments;
  }

  touch(): void {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<AnswerProps, "createdAt" | "attachments">,
    id?: UniqueEntityId
  ): Answer {
    return new Answer(
      {
        ...props,
        attachments: props.attachments ?? [],
        createdAt: new Date(),
      },
      id
    );
  }
}
