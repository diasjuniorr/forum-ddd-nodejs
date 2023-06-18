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

    expect(res.question.id).toBeDefined();

    expect(res.question.title).toBe(title);
    expect(res.question.content).toBe(content);
    expect(res.question.authorId).toBe(authorId.toString());
    expect(res.question.slug).toBe("new-question");
  });
});
