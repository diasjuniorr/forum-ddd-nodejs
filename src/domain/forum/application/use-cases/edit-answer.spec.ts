import { beforeEach, describe, expect, it } from "vitest";
import { AnswersRepository } from "../repositories/answers-repository";
import { EditAnswerUseCase } from "./edit-answer";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";

let inMemoryAnswerRepository: AnswersRepository;
let sut: EditAnswerUseCase;
let authorId: UniqueEntityId;
let answerId: UniqueEntityId;

describe("edit answer use case", () => {
  beforeEach(async () => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswerRepository);
    authorId = new UniqueEntityId();

    const answer = makeAnswer({ authorId });
    answerId = answer.id;

    await inMemoryAnswerRepository.create(answer);
  });

  it("should update a answer", async () => {
    const newContent = "new content";

    const res = await sut.execute({
      answerId: answerId.toString(),
      authorId: authorId.toString(),
      content: newContent,
    });

    expect(res.isRight()).toBe(true);

    if (res.isRight()) {
      expect(res.value?.answer.content).toBe(newContent);
    }
  });
});
