import { beforeEach, describe, expect, it } from "vitest";
import { QuestionsRepository } from "../repositories/questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { Question } from "../../enterprise/entities/question";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";

let inMemoryQuestionRepository: QuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("get question by slug", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository);

    const title = "New Question under test";
    const content = "A random question";
    const authorId = new UniqueEntityId();
    const id = new UniqueEntityId();

    const question = Question.create({ title, content, authorId }, id);
    inMemoryQuestionRepository.create(question);
  });

  it("should return a question", async () => {
    const res = await sut.execute({ slug: "new-question-under-test" });

    expect(res.question).toBeDefined();
    expect(res.question?.slug).toBe("new-question-under-test");
  });
});
