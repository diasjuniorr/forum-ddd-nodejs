import { expect, describe, beforeEach, it } from "vitest";
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
    const res = await sut.execute({
      authorId: new UniqueEntityId().toString(),
      questionId: new UniqueEntityId().toString(),
      content: "content",
      attachmentIds: [],
    });

    expect(res.isRight()).toBe(true);

    expect(res.value?.answer).toBeDefined();
  });
});
