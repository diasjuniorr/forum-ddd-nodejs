import { beforeEach, describe, expect, it } from "vitest";
import { CreateQuestionUseCase } from "./create-question";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { makeQuestion } from "../../../../../test/factories/make-question";

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
      authorId: authorId.toString(),
      attachmentIds: [],
    });

    expect(res.isRight()).toBe(true);
    expect(res.value?.question.id).toBeDefined();

    expect(res.value?.question.title).toBe(title);
    expect(res.value?.question.content).toBe(content);
    expect(res.value?.question.authorId.toString()).toBe(authorId.toString());
    expect(res.value?.question.slug).toBe("new-question");
  });

  it("should create a question with attachments", async () => {
    const question = makeQuestion();
    const { title, authorId, content } = question;

    const res = await sut.execute({
      title,
      content,
      authorId: authorId.toString(),
      attachmentIds: ["1", "2"],
    });

    expect(res.isRight()).toBe(true);
    expect(inMemoryQuestionRepository.items.length).toBe(1);

    expect(
      inMemoryQuestionRepository.items[0].attachments.getItems()
    ).toHaveLength(2);

    expect(
      inMemoryQuestionRepository.items[0].attachments
        .getItems()[0]
        .attachmentId.toString()
    ).toBe("1");

    expect(
      inMemoryQuestionRepository.items[0].attachments
        .getItems()[1]
        .attachmentId.toString()
    ).toBe("2");
  });
});
