import { Slug } from "./value-objects/slug";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { Optional } from "../../../core/types/optional";
import { AggregateRoot } from "../../../core/entities/aggregate-root";
import { QuestionAttachmentList } from "./question-attachment-list";

export interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;
  attachments: QuestionAttachmentList;
  createdAt: Date;
  updatedAt?: Date;
}

export interface UpdateQuestionProps {
  title?: string;
  content?: string;
}

export class Question extends AggregateRoot<QuestionProps> {
  get title(): string {
    return this.props.title;
  }

  get content(): string {
    return this.props.content;
  }

  get authorId(): UniqueEntityId {
    return this.props.authorId;
  }

  get slug(): string {
    return this.props.slug.value;
  }

  get attachments(): QuestionAttachmentList {
    return this.props.attachments;
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
    this.slug = title;
    this.touch();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  set slug(text: string) {
    this.props.slug = Slug.createFromText(text);
  }

  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments;
  }

  touch(): void {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<QuestionProps, "createdAt" | "slug" | "attachments">,
    id?: UniqueEntityId
  ): Question {
    return new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments || new QuestionAttachmentList(),
        createdAt: new Date(),
      },
      id
    );
  }
}
