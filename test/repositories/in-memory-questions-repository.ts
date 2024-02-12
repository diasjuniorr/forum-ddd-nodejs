import { UniqueEntityId } from "../../src/domain/core/entities/unique-entity-id";
import { PaginationParam } from "../../src/domain/core/repositories/pagination-params";
import { QuestionsRepository } from "../../src/domain/forum/application/repositories/questions-repository";
import { Question } from "../../src/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async create(question: Question) {
    this.items.push(question);
    return question;
  }

  async createBatch(questions: Question[]) {
    this.items.push(...questions);
    return questions;
  }

  async getBySlug(slug: string) {
    const question = this.items.find((question) => question.slug === slug);

    if (!question) return null;

    return question;
  }

  async getById(id: string): Promise<Question | null> {
    const question = this.items.find(
      (question) => question.id.toString() === id
    );

    if (!question) throw new Error("no question found");

    return question;
  }

  async delete(question: Question): Promise<void> {
    this.items = this.items.filter((item) => item.id != question.id);
  }

  async update(question: Question): Promise<Question | null> {
    const questionIdx = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString()
    );

    if (questionIdx < 0) return null;

    this.items[questionIdx] = question;

    return question;
  }

  async findManyRecent({ page, limit }: PaginationParam): Promise<Question[]> {
    this.items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    page = page < 0 ? 1 : page;
    const skip = (page - 1) * limit;

    return this.items.slice(skip, page * limit);
  }
}
