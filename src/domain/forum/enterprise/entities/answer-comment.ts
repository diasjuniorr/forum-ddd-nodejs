import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { Optional } from "../../../core/types/optional";
import { Comment, CommentProps } from "../../../core/entities/comment";

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityId;
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId(): string {
    return this.props.answerId.toString();
  }

  static create(
    props: Optional<AnswerCommentProps, "createdAt">,
    id?: UniqueEntityId
  ): AnswerComment {
    return new AnswerComment(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );
  }
}
