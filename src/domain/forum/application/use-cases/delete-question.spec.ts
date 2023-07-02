import { beforeEach, describe, expect, it } from "vitest";
import { QuestionsRepository } from "../repositories/questions-repository";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { Question } from "../../enterprise/entities/question";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";

let inMemoryQuestionsRepository: QuestionsRepository;
let sut: DeleteQuestionUseCase;
let question: Question;
let authorId = new UniqueEntityId("author-id");

describe("delete by slug use case", () => {
  beforeEach(async () => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);

    question = makeQuestion({
      title: "Question to delete",
      authorId,
    });
    await inMemoryQuestionsRepository.create(question);
  });

  it("should delete a question", async () => {
    const res = await sut.execute({ question, authorId: authorId.toString() });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it("should not allow question deletion by another author", async () => {
    expect(() => {
      return sut.execute({ question, authorId: "invalid-id" });
    }).rejects.toBeInstanceOf(Error);
  });
});
