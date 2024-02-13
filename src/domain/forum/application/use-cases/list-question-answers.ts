import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface ListQuestionAnswersUseCaseRequest {
  questionId: UniqueEntityId;
  page: number;
  limit: number;
}

export class ListQuestionAnswersUseCase {
  public answersRepository: AnswersRepository;
  public questionsRepository: QuestionsRepository;

  constructor(
    answersRepository: AnswersRepository,
    questionsRepository: QuestionsRepository
  ) {
    this.answersRepository = answersRepository;
    this.questionsRepository = questionsRepository;
  }

  async execute({
    questionId,
    page,
    limit,
  }: ListQuestionAnswersUseCaseRequest) {
    const question = await this.questionsRepository.getById(
      questionId.toString()
    );

    if (!question) throw new Error("question not found");

    const answers = await this.answersRepository.findManyByQuestionId(
      questionId.toString(),
      {
        page,
        limit,
      }
    );

    return { questionId, answers };
  }
}
