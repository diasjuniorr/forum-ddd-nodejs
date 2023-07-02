import { Question } from "../../enterprise/entities/question";

export interface QuestionsRepository {
  items: Question[];
  create(question: Question): Promise<Question>;
  getBySlug(slug: string): Promise<Question | null>;
  getById(id: string): Promise<Question | null>;
  delete(question: Question): Promise<void>;
}
