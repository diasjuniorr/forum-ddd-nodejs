import { Either, left, right } from "../../../core/types/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { OperationNotAllowedError } from "./errors/operation-not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface EditQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
  title: string;
  content: string;
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | OperationNotAllowedError,
  { question: Question }
>;

export class EditQuestionUseCase {
  public questionRepository: QuestionsRepository;

  constructor(questionRepository: QuestionsRepository) {
    this.questionRepository = questionRepository;
  }

  public async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.getById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError("question"));
    }

    if (question.authorId.toString() != authorId) {
      return left(new OperationNotAllowedError("question"));
    }

    question.title = title;
    question.content = content;

    const res = await this.questionRepository.update(question);

    if (!res) {
      return left(new ResourceNotFoundError("question"));
    }

    return right({ question });
  }
}
