import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  questionId: UniqueEntityId;
  authorId: UniqueEntityId;
  content: string;
}

export class AnswerQuestionUseCase {
  public answerRepository: AnswersRepository;

  constructor(answerRepository: AnswersRepository) {
    this.answerRepository = answerRepository;
  }

  async execute({
    questionId,
    authorId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({ content, authorId, questionId });

    await this.answerRepository.create(answer);

    return answer;
  }
}
