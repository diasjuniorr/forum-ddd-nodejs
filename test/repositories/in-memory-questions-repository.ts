import { QuestionsRepository } from "../../src/domain/forum/application/repositories/questions-repository";
import { Question } from "../../src/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  items: Question[] = [];

  async create(question: Question) {
    this.items.push(question);
    return question;
  }

  async getBySlug(slug: string) {
    const question = this.items.find((question) => question.slug === slug);

    if (!question) return null;

    return question;
  }
}
