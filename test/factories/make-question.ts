import { UniqueEntityId } from "../../src/domain/core/entities/unique-entity-id";
import {
  Question,
  QuestionProps,
} from "../../src/domain/forum/enterprise/entities/question";

export const makeQuestion = (overrride?: Partial<QuestionProps>): Question => {
  return Question.create({
    title: "title",
    content: "Content",
    authorId: new UniqueEntityId(),
    ...overrride,
  });
};
