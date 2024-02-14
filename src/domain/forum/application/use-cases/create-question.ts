import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { Either, right } from "../../../core/types/either";
import { Question, QuestionProps } from "../../enterprise/entities/question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { QuestionsRepository } from "../repositories/questions-repository";

interface CreateQuestionUseCaseRequest {
  title: string;
  content: string;
  authorId: UniqueEntityId;
  slug?: Slug;
}

type CreateQuestionUseCaseResponse = Either<{}, { question: Question }>;

export class CreateQuestionUseCase {
  public questionsRepository: QuestionsRepository;

  constructor(questionsRepository: QuestionsRepository) {
    this.questionsRepository = questionsRepository;
  }

  async execute(
    { title, content, authorId, slug }: CreateQuestionUseCaseRequest,
    id?: UniqueEntityId
  ): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({ title, content, authorId, slug }, id);

    await this.questionsRepository.create(question);

    return right({ question });
  }
}
