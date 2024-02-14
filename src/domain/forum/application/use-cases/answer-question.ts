import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { Either, right } from "../../../core/types/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  questionId: UniqueEntityId;
  authorId: UniqueEntityId;
  content: string;
}

type AnswerQuestinUseCaseResponse = Either<{}, { answer: Answer }>;

export class AnswerQuestionUseCase {
  public answerRepository: AnswersRepository;

  constructor(answerRepository: AnswersRepository) {
    this.answerRepository = answerRepository;
  }

  async execute({
    questionId,
    authorId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestinUseCaseResponse> {
    const answer = Answer.create({ content, authorId, questionId });

    await this.answerRepository.create(answer);

    return right({ answer });
  }
}
