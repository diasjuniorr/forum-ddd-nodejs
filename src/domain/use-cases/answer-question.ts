import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
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
    const answer = new Answer({ content, authorId, questionId });

    await this.answerRepository.create(answer);

    return answer;
  }
}
