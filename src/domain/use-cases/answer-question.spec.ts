import { test, expect } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { Answer } from "../entities/answer";

const mockAnswerRepository = {
  create: async (answer: Answer) => {},
};

test("create an answer", async () => {
  const content = "any_content";
  const authorId = "any_author_id";
  const questionId = "any_question_id";

  const answerQuestionUseCase = new AnswerQuestionUseCase(mockAnswerRepository);

  const answer = await answerQuestionUseCase.execute({
    questionId,
    authorId,
    content,
  });

  expect(answer.content).toEqual(content);
  expect(answer.authorId).toEqual(authorId);
  expect(answer.questionId).toEqual(questionId);
  expect(answer.id).toBeDefined();
});
