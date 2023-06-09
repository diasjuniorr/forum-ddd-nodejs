import { test, expect } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { Answer } from "../../enterprise/entities/answer";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";

const mockAnswerRepository = {
  create: async (answer: Answer) => {},
};

test("create an answer", async () => {
  const content = "any_content";
  const authorId = new UniqueEntityId("any_author_id");
  const questionId = new UniqueEntityId("any_question_id");

  const answerQuestionUseCase = new AnswerQuestionUseCase(mockAnswerRepository);

  const answer = await answerQuestionUseCase.execute({
    questionId,
    authorId,
    content,
  });

  expect(answer.content).toEqual(content);
  expect(answer.authorId).toBe(authorId.toString());
  expect(answer.questionId).toBe(questionId.toString());
  expect(answer.id).toBeDefined();
});
