import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface GetQuestionBySlugUseCaseRequest {
  slug: string;
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question;
}

export class GetQuestionBySlugUseCase {
  public questionRepository: QuestionsRepository;

  constructor(questionRepository: QuestionsRepository) {
    this.questionRepository = questionRepository;
  }

  async execute({ slug }: GetQuestionBySlugUseCaseRequest) {
    const question = await this.questionRepository.getBySlug(slug);

    if (!question) {
      throw new Error("question not found");
    }

    return { question };
  }
}
