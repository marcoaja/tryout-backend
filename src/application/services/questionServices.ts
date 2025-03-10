import "reflect-metadata";
import { injectable, inject } from "inversify";
import { TYPES } from "../../infrastructure/entity/types";
import type { QuestionRepository } from "../../infrastructure/db/questionRepo";
import type {
	CreateQuestion,
	UpdateQuestion,
} from "../../infrastructure/entity/interface";

@injectable()
export class QuestionServices {
	private questionRepo: QuestionRepository;

	constructor(@inject(TYPES.questionRepo) questionRepo: QuestionRepository) {
		this.questionRepo = questionRepo;
	}

	async getAll(tryoutId: string) {
		const questions = await this.questionRepo.getAll(tryoutId);
		return questions;
	}

	async getOne(questionId: string) {
		const question = await this.questionRepo.getOne(questionId);
		return question;
	}

	async create(data: CreateQuestion & { tryoutId: string }) {
		return await this.questionRepo.create(data);
	}

	async update(questionId: string, data: UpdateQuestion) {
		const question = await this.questionRepo.update(questionId, data);
		return question;
	}

	async delete(questionId: string) {
		await this.questionRepo.delete(questionId);
	}
}
