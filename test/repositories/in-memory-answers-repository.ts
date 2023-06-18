import { AnswersRepository } from "../../src/domain/forum/application/repositories/answers-repository";
import { Answer } from "../../src/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  private items: any[] = [];

  async create(answer: Answer) {
    this.items.push(answer);
    return answer;
  }
}
