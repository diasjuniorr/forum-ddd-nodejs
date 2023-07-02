import { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
  id: string;
  authorId: string;
}

interface DeleteAnswerUseCaseResponse {}

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

    if (!answer) throw new Error("answer not found");

    if (answer.authorId.toString() != authorId) {
      throw new Error("not allowed");
    }

    await this.answersRepository.delete(answer);

    return {};
  }
}
