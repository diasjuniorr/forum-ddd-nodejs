import { expect, test } from "vitest";
import { CreateQuestionUseCase } from "./create-question";
import { Question } from "../../enterprise/entities/question";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";

const mockQuestionsRepository = {
  create: async (question: Question) => {},
};

test("create a question", async () => {
  const createQuestionUseCase = new CreateQuestionUseCase(
    mockQuestionsRepository
  );

  const title = "New Question";
  const content = "A random question";
  const authorId = new UniqueEntityId();

  const res = createQuestionUseCase.execute({
    title,
    content,
    authorId,
  });

  expect(res.question.title).toBe(title);
  expect(res.question.content).toBe(content);
  expect(res.question.authorId).toBe(authorId.toString());
  expect(res.question.slug).toBe("new-question");
  expect(res.question.id).toBeDefined();
});
