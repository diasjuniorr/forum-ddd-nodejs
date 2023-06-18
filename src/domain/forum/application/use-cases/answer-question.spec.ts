import { test, expect, describe, beforeEach, it } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("test answer question use case", async () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should create an answer", async () => {
    const { answer } = await sut.execute({
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: "content",
    });

    expect(answer.id).toBeDefined();
  });
});
