import { PaginationParam } from "../../../core/repositories/pagination-params";
import { Answer } from "../../enterprise/entities/answer";

export interface AnswersRepository {
  items: Answer[];
  create(answer: Answer): Promise<Answer>;
  createBatch(answers: Answer[]): Promise<Answer[]>;
  getById(id: string): Promise<Answer | null>;
  delete(answer: Answer): Promise<void>;
  update(answer: Answer): Promise<Answer | null>;
  findManyByQuestionId(
    questionId: string,
    pagination: PaginationParam
  ): Promise<Answer[]>;
}
