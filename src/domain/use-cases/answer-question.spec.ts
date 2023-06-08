import { test, expect } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";

test("create an answer", () => {
  const content = "any_content";
  const authorId = "any_author_id";
  const questionId = "any_question_id";

  const answer = new AnswerQuestionUseCase().execute({
    questionId,
    authorId,
    content,
  });

  expect(answer.content).toEqual(content);
  expect(answer.authorId).toEqual(authorId);
  expect(answer.questionId).toEqual(questionId);
});
