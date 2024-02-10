import { beforeEach, describe, expect, it } from "vitest";
import { QuestionsRepository } from "../repositories/questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { makeQuestion } from "../../../../../test/factories/make-question";

let inMemoryQuestionRepository: QuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("get question by slug", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository);

    const question = makeQuestion({ title: "New question under test" });
    inMemoryQuestionRepository.create(question);
  });

  it("should return a question", async () => {
    const res = await sut.execute({ slug: "new-question-under-test" });

    expect(res.question).toBeDefined();
    expect(res.question?.slug).toBe("new-question-under-test");
  });
});
