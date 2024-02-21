import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { Either, right } from "../../../core/types/either";
import { Question, QuestionProps } from "../../enterprise/entities/question";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { QuestionsRepository } from "../repositories/questions-repository";

interface CreateQuestionUseCaseRequest {
  title: string;
  content: string;
  authorId: string;
  attachmentIds: string[];
  slug?: Slug;
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>;

export class CreateQuestionUseCase {
  public questionsRepository: QuestionsRepository;

  constructor(questionsRepository: QuestionsRepository) {
    this.questionsRepository = questionsRepository;
  }

  async execute(
    {
      title,
      content,
      authorId,
      attachmentIds,
      slug,
    }: CreateQuestionUseCaseRequest,
    id?: UniqueEntityId
  ): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create(
      { title, content, slug, authorId: new UniqueEntityId(authorId) },
      id
    );
    const questionId = question.id;

    const attachments = attachmentIds.map((attachmentId) => {
      return QuestionAttachment.create(
        { questionId, attachmentId: new UniqueEntityId(attachmentId) },
        new UniqueEntityId()
      );
    });

    question.attachments = attachments;

    await this.questionsRepository.create(question);

    return right({ question });
  }
}
