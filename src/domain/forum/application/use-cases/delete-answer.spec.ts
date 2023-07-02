import { beforeEach, describe, expect, it } from "vitest";
import { AnswersRepository } from "../repositories/answers-repository";
import { DeleteAnswerUseCase } from "./delete-answer";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { makeAnswer } from "../../../../../test/factories/make-answer";

let inMemoryAnswersRepository: AnswersRepository;
let sut: DeleteAnswerUseCase;
let answer = makeAnswer();

describe("delete answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);

    inMemoryAnswersRepository.create(answer);
  });

  it("should delete an answer", async () => {
    await sut.execute({ id: answer.id.toString() });

    expect(sut.answersRepository.items.length).toEqual(0);
  });

  it("should throw an error", async () => {
    expect(async () => {
      await sut.execute({ id: "1" });
    }).rejects.toBeInstanceOf(Error);
  });
});
