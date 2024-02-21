import { Either, left, right } from "../../../core/types/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { OperationNotAllowedError } from "./errors/operation-not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteQuestionUseCaseRequest {
  question: Question;
  authorId: string;
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | OperationNotAllowedError,
  {}
>;

export class DeleteQuestionUseCase {
  public questionsRepository: QuestionsRepository;

  constructor(questionsRepository: QuestionsRepository) {
    this.questionsRepository = questionsRepository;
  }

  async execute({
    question,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const exists = await this.questionsRepository.getById(
      question.id.toString()
    );

    if (!exists) return left(new ResourceNotFoundError("question"));

    if (exists.authorId.toString() != authorId) {
      return left(new OperationNotAllowedError("question"));
    }

    await this.questionsRepository.delete(question);

    return right({});
  }
}
