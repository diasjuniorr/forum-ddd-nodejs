import { Entity } from "../../../core/entities/entity";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";

export interface AnswerAttachmentProps {
  questionId: UniqueEntityId;
  answerId: UniqueEntityId;
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get questionId() {
    return this.props.questionId;
  }

  get answerId() {
    return this.props.answerId;
  }

  static create(props: AnswerAttachmentProps, id: UniqueEntityId) {
    return new AnswerAttachment(props, id);
  }
}
