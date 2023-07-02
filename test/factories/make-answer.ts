import { faker } from "@faker-js/faker";

import {
  Answer,
  AnswerProps,
} from "../../src/domain/forum/enterprise/entities/answer";
import { UniqueEntityId } from "../../src/domain/core/entities/unique-entity-id";

export const makeAnswer = (overrride?: Partial<AnswerProps>) => {
  return Answer.create({
    content: faker.lorem.text(),
    questionId: new UniqueEntityId(),
    authorId: new UniqueEntityId(),
    ...overrride,
  });
};
