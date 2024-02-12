import { beforeEach, describe, expect, it } from "vitest";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";
import { SaveBestAnswerUseCase } from "./save-best-answer";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";

let answersRepository: AnswersRepository;
let questionsRepository: QuestionsRepository;
let sut: SaveBestAnswerUseCase;

let questionId: UniqueEntityId;
let bestAnswerId: UniqueEntityId;

describe("save best answer use case", () => {
  beforeEach(async () => {
    answersRepository = new InMemoryAnswersRepository();
    questionsRepository = new InMemoryQuestionsRepository();

    const question = makeQuestion();
    questionId = question.id;

    await questionsRepository.create(question);

    const answer = makeAnswer({ questionId, content: "best answer" });
    bestAnswerId = answer.id;
    await answersRepository.create(answer);

    sut = new SaveBestAnswerUseCase(questionsRepository, answersRepository);
    await sut.execute({ questionId, answerId: bestAnswerId });
  });

  it("should save the best answer to a question", async () => {
    const question = await questionsRepository.getById(questionId.toString());

    expect(question?.bestAnswerId).toBe(bestAnswerId);
  });
});
