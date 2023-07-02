import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface DeleteQuestionUseCaseRequest {
  question: Question;
  authorId: string;
}

interface DeleteQuestionUseCaseResponse {}

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

    if (!exists) throw new Error("question not found");

    if (exists.authorId != authorId) throw new Error("not allowed");

    await this.questionsRepository.delete(question);

    return {};
  }
}
