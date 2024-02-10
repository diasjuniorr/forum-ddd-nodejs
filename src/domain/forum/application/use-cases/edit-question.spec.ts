import { beforeEach, describe, expect, it } from "vitest";
import { QuestionsRepository } from "../repositories/questions-repository";
import { EditQuestionUseCase } from "./edit-question";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";

let inMemoryQuestionRepository: QuestionsRepository;
let sut: EditQuestionUseCase;
let authorId: UniqueEntityId;
let questionId: UniqueEntityId;

describe("edit question use case", () => {
  beforeEach(async () => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionRepository);
    authorId = new UniqueEntityId();

    const question = makeQuestion({ authorId });
    questionId = question.id;

    await inMemoryQuestionRepository.create(question);
  });

  it("should update a question", async () => {
    const newTitle = "new title";
    const newContent = "new content";

    const res = await sut.execute({
      questionId: questionId.toString(),
      authorId: authorId.toString(),
      title: newTitle,
      content: newContent,
    });

    expect(res.question.content).toBe(newContent);
    expect(res.question.title).toBe(newTitle);
  });
});
