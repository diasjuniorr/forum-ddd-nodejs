import { Either, left, right } from "../../../core/types/either";
import { AnswersRepository } from "../repositories/answers-repository";
import { OperationNotAllowedError } from "./errors/operation-not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteAnswerUseCaseRequest {
  id: string;
  authorId: string;
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError, {}>;

export class DeleteAnswerUseCase {
  public answersRepository: AnswersRepository;

  constructor(answersRepository: AnswersRepository) {
    this.answersRepository = answersRepository;
  }

  async execute({
    id,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.getById(id);

    if (!answer) return left(new ResourceNotFoundError("answer"));

    if (answer.authorId.toString() != authorId)
      return left(new OperationNotAllowedError("unauthorized user"));

    await this.answersRepository.delete(answer);

    return right({});
  }
}
