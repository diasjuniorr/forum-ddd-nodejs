import { Entity } from "../../../core/entities/entity";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";

export interface QuestionAttachmentProps {
  questionId: UniqueEntityId;
  answerId: UniqueEntityId;
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId;
  }

  get answerId() {
    return this.props.answerId;
  }

  static create(props: QuestionAttachmentProps, id: UniqueEntityId) {
    return new QuestionAttachment(props, id);
  }
}
