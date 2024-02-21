import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { Either, right } from "../../../core/types/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
  attachmentIds: string[];
  content: string;
}

type AnswerQuestinUseCaseResponse = Either<null, { answer: Answer }>;

export class AnswerQuestionUseCase {
  public answerRepository: AnswersRepository;

  constructor(answerRepository: AnswersRepository) {
    this.answerRepository = answerRepository;
  }

  async execute({
    questionId,
    authorId,
    content,
    attachmentIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestinUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
    });

    const answerId = answer.id;

    const attachments = attachmentIds.map((attachmentId) =>
      AnswerAttachment.create({
        answerId,
        attachmentId: new UniqueEntityId(attachmentId),
      })
    );

    answer.attachments = attachments;

    await this.answerRepository.create(answer);

    return right({ answer });
  }
}
