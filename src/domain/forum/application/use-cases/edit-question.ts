import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface EditQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
  title: string;
  content: string;
}

interface EditQuestionUseCaseResponse {
  question: Question;
}

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

    if (!question) throw new Error("question not found");

    if (question.authorId != authorId) throw new Error("not allowed");

    question.title = title;
    question.content = content;

    const res = await this.questionRepository.update(question);

    if (!res) throw new Error("question not found");

    return { question };
  }
}
