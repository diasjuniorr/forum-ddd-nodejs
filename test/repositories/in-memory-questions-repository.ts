import { UniqueEntityId } from "../../src/domain/core/entities/unique-entity-id";
import { QuestionsRepository } from "../../src/domain/forum/application/repositories/questions-repository";
import { Question } from "../../src/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async create(question: Question) {
    this.items.push(question);
    return question;
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
}
