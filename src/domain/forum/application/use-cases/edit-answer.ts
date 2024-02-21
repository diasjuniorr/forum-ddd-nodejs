import { Either, left, right } from "../../../core/types/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";
import { OperationNotAllowedError } from "./errors/operation-not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface EditAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
  content: string;
}

type EditAnswerUseCaseResponse = Either<
  OperationNotAllowedError | ResourceNotFoundError,
  { answer: Answer }
>;

export class EditAnswerUseCase {
  public answerRepository: AnswersRepository;

  constructor(answerRepository: AnswersRepository) {
    this.answerRepository = answerRepository;
  }

  public async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.getById(answerId);

    if (!answer) return left(new ResourceNotFoundError("answer"));

    if (answer.authorId != authorId)
      return left(new OperationNotAllowedError("answer"));

    answer.content = content;

    const res = await this.answerRepository.update(answer);

    if (!res) left(new ResourceNotFoundError("updating answer"));

    return right({ answer });
  }
}
