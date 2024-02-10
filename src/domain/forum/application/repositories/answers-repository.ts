import { Answer } from "../../enterprise/entities/answer";

export interface AnswersRepository {
  items: Answer[];
  create(answer: Answer): Promise<Answer>;
  getById(id: string): Promise<Answer | null>;
  delete(answer: Answer): Promise<void>;
  update(answer: Answer): Promise<Answer | null>;
}
