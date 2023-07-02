import { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
  id: string;
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  public answersRepository: AnswersRepository;

  constructor(answersRepository: AnswersRepository) {
    this.answersRepository = answersRepository;
  }

  async execute({
    id,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.getById(id);

    if (!answer) throw new Error("answer not found");

    await this.answersRepository.delete(answer);

    return {};
  }
}
