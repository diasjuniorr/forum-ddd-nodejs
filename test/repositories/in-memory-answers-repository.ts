import { PaginationParam } from "../../src/domain/core/repositories/pagination-params";
import { AnswersRepository } from "../../src/domain/forum/application/repositories/answers-repository";
import { Answer } from "../../src/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async create(answer: Answer) {
    this.items.push(answer);
    return answer;
  }

  async createBatch(answers: Answer[]) {
    this.items.push(...answers);
    return answers;
  }

  async getById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) return null;

    return answer;
  }

  async delete(answer: Answer): Promise<void> {
    this.items = this.items.filter(
      (item) => item.id.toString() != answer.id.toString()
    );
  }

  async update(answer: Answer): Promise<Answer | null> {
    const answerIdx = this.items.findIndex((item) => item.id === answer.id);

    if (answerIdx < 0) return null;

    this.items[answerIdx] = answer;

    return answer;
  }

  async findManyByQuestionId(
    questionId: string,
    { page, limit }: PaginationParam
  ): Promise<Answer[]> {
    const skip = (page - 1) * limit;

    return this.items
      .filter((item) => item.questionId === questionId)
      .slice(skip, page * limit);
  }
}
