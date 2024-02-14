import { beforeEach, describe, expect, it } from "vitest";
import { AnswersRepository } from "../repositories/answers-repository";
import { DeleteAnswerUseCase } from "./delete-answer";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";

let inMemoryAnswersRepository: AnswersRepository;
let sut: DeleteAnswerUseCase;

let authorId = new UniqueEntityId();
let answer = makeAnswer({ authorId });

describe("delete answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);

    inMemoryAnswersRepository.create(answer);
  });

  it("should delete an answer", async () => {
    await sut.execute({
      id: answer.id.toString(),
      authorId: authorId.toString(),
    });

    expect(sut.answersRepository.items.length).toEqual(0);
  });

  it("should throw an error when answer does not exist", async () => {
    expect(async () => {
      const res = await sut.execute({ id: "1", authorId: authorId.toString() });

      expect(res.isLeft()).toBeTruthy();
    });
  });

  it("should throw an error when author is not allowed", async () => {
    expect(async () => {
      const res = await sut.execute({
        id: answer.id.toString(),
        authorId: "1",
      });

      expect(res.isLeft()).toBeTruthy();
    });
  });
});
