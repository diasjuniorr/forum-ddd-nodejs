import { test, expect } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";

test("create an answer", () => {
  const content = "any_content";
  const answer = new AnswerQuestionUseCase().execute({
    questionId: "any_question_id",
    instructorId: "any_instructor_id",
    content,
  });

  expect(answer.content).toEqual(content);
});
