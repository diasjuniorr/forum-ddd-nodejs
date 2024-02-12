import { beforeEach, describe, expect, it } from "vitest";
import { QuestionsRepository } from "../repositories/questions-repository";
import { ListRecentQuestionsUseCase } from "./list-recent-questions";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { Question } from "../../enterprise/entities/question";
import { makeQuestion } from "../../../../../test/factories/make-question";

let questionsRepository: QuestionsRepository;
let sut: ListRecentQuestionsUseCase;

describe("list recent questions use case", () => {
  beforeEach(async () => {
    questionsRepository = new InMemoryQuestionsRepository();

    let questions: Question[];
    questions = [];

    for (let i = 0; i < 11; i++) {
      questions.push(makeQuestion());

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    await questionsRepository.createBatch(questions);

    sut = new ListRecentQuestionsUseCase(questionsRepository);
  });

  it("should return the most recent questions", async () => {
    const res = await sut.execute({ page: 1, limit: 10 });

    expect(res.questions).toBeDefined();
    expect(res.questions.length).toBe(10);
    expect(res.questions[0].createdAt.getTime()).toBeGreaterThan(
      res.questions[1].createdAt.getTime()
    );
    expect(res.questions[1].createdAt.getTime()).toBeGreaterThan(
      res.questions[2].createdAt.getTime()
    );
  });
});
