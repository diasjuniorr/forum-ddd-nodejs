import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "../../src/domain/core/entities/unique-entity-id";
import {
  Question,
  QuestionProps,
} from "../../src/domain/forum/enterprise/entities/question";

export const makeQuestion = (overrride?: Partial<QuestionProps>): Question => {
  return Question.create({
    title: faker.lorem.sentence(),
    content: faker.lorem.text(),
    authorId: new UniqueEntityId(),
    ...overrride,
  });
};
