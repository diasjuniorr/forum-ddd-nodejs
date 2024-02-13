import { beforeEach, describe, expect, it } from "vitest";
import { QuestionsRepository } from "../repositories/questions-repository";
import { AnswersRepository } from "../repositories/answers-repository";
import { ListQuestionAnswersUseCase } from "./list-question-answers";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { Answer } from "../../enterprise/entities/answer";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";

let questionsRepository: QuestionsRepository;
let answersRepository: AnswersRepository;
let sut: ListQuestionAnswersUseCase;
let questionId: UniqueEntityId;

describe("list quesion answers use case", () => {
  beforeEach(async () => {
    questionsRepository = new InMemoryQuestionsRepository();
    answersRepository = new InMemoryAnswersRepository();
    sut = new ListQuestionAnswersUseCase(
      answersRepository,
      questionsRepository
    );

    let answers: Answer[];
    answers = [];

    const question = makeQuestion();
    questionId = question.id;

    await questionsRepository.create(question);

    //create answers to question
    for (let i = 0; i < 5; i++) {
      const answer = makeAnswer();
      answer.questionId = questionId;
      answers.push(answer);
    }

    await answersRepository.createBatch(answers);

    let randomAnswers: Answer[];
    randomAnswers = [];

    //create answers to random questions
    for (let i = 0; i < 10; i++) {
      randomAnswers.push(makeAnswer());
    }

    await answersRepository.createBatch(randomAnswers);
  });
  it("should list only answers to questionId", async () => {
    const res = await sut.execute({ questionId, page: 1, limit: 32 });

    expect(res).toBeDefined();
    expect(res.answers.length).toBe(5);

    res.answers.forEach((answer) => {
      expect(answer.questionId).toBe(questionId.toString());
    });
  });
});
