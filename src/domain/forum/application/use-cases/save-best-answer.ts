import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface SaveBestAnswerUseCaseRequest {
  answerId: UniqueEntityId;
  questionId: UniqueEntityId;
}

export class SaveBestAnswerUseCase {
  public questionsRepository: QuestionsRepository;
  public answersRepository: AnswersRepository;

  constructor(
    questionRepository: QuestionsRepository,
    answersRepository: AnswersRepository
  ) {
    this.questionsRepository = questionRepository;
    this.answersRepository = answersRepository;
  }

  async execute({ answerId, questionId }: SaveBestAnswerUseCaseRequest) {
    const question = await this.questionsRepository.getById(
      questionId.toString()
    );
    if (!question) throw Error("question not found");

    const answer = await this.answersRepository.getById(answerId.toString());
    if (!answer) throw new Error("answer not found");

    question.bestAnswerId = answerId;

    const updatedQuestion = await this.questionsRepository.update(question);
    if (!updatedQuestion) throw new Error("question not updated");

    return { question: updatedQuestion };
  }
}
