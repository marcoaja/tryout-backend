import type { TryoutRepository } from "../../infrastructure/db/tryoutRepo";
import type {
  CreateTryout,
  UpdateTryout,
  CreateQuestion,
} from "../../infrastructure/entity/interface";
import "reflect-metadata";
import { injectable, inject } from "inversify";
import { TYPES } from "../../infrastructure/entity/types";

@injectable()
export class TryoutServices {
  private tryoutRepo: TryoutRepository;

  constructor(@inject(TYPES.tryoutRepo) tryoutRepo: TryoutRepository) {
    this.tryoutRepo = tryoutRepo;
  }

  async getAll(filters?: {
    title?: string;
    startDate?: Date;
    endDate?: Date;
    category?: string;
  }) {
    const tryouts = await this.tryoutRepo.getAll(filters);
    return tryouts;
  }

  async getOne(id: string) {
    const tryout = await this.tryoutRepo.getOne(id);
    return tryout;
  }

  async create(data: CreateTryout) {
    const newTryout = await this.tryoutRepo.create(data);
    return newTryout;
  }

  async addQuestion(tryoutId: string, data: CreateQuestion) {
    const newQuestion = await this.tryoutRepo.addQuestion(tryoutId, data);
    return newQuestion;
  }

  async update(tryoutId: string, data: UpdateTryout) {
    const updatedTryout = await this.tryoutRepo.update(tryoutId, data);
    return updatedTryout;
  }

  async delete(tryoutId: string) {
    await this.tryoutRepo.delete(tryoutId);
  }
}
