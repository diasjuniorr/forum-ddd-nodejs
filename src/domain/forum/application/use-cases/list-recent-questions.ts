import { QuestionsRepository } from "../repositories/questions-repository";

export interface ListRecentQuestionsUseCaseRequest {
  page: number;
  limit: number;
}

export class ListRecentQuestionsUseCase {
  public questionsRepository: QuestionsRepository;

  constructor(questionsRepository: QuestionsRepository) {
    this.questionsRepository = questionsRepository;
  }

  async execute({ page, limit }: ListRecentQuestionsUseCaseRequest) {
    page = page < 0 ? 1 : page;

    const questions = await this.questionsRepository.findManyRecent({
      page,
      limit,
    });

    return { questions };
  }
}
