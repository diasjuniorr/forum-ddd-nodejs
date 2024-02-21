import { beforeEach, describe, expect, it } from "vitest";
import { CreateQuestionUseCase } from "./create-question";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("create question use case", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository);
  });

  it("should create a question", async () => {
    const title = "New Question";
    const content = "A random question";
    const authorId = new UniqueEntityId();

    const res = await sut.execute({
      title,
      content,
      authorId,
    });

    expect(res.isRight()).toBe(true);
    expect(res.value?.question.id).toBeDefined();

    expect(res.value?.question.title).toBe(title);
    expect(res.value?.question.content).toBe(content);
    expect(res.value?.question.authorId).toBe(authorId);
    expect(res.value?.question.slug).toBe("new-question");
  });
});
