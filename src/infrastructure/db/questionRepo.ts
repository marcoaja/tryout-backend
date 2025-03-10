import { Prisma, type PrismaClient } from "@prisma/client";
import "reflect-metadata";
import { injectable, inject } from "inversify";
import { TYPES } from "../entity/types";
import { DBError } from "../entity/error";
import type {
  CreateQuestion,
  IQuestion,
  UpdateQuestion,
} from "../entity/interface";

@injectable()
export class QuestionRepository implements IQuestion {
  private prisma: PrismaClient;

  constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAll(tryoutId: string) {
    try {
      const questions = await this.prisma.question.findMany({
        where: {
          tryoutId: tryoutId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      return questions;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DBError("Error fetching questions from DB");
      }
      throw new DBError("Something went wrong while doing DB operation");
    }
  }

  async getOne(id: string) {
    try {
      const question = await this.prisma.question.findUnique({
        where: {
          id: id,
        },
        include: {
          tryout: true,
        },
      });
      return question;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DBError("Error fetching question from DB");
      }
      throw new DBError("Something went wrong while doing DB operation");
    }
  }

  async create(data: CreateQuestion & { tryoutId: string }) {
    try {
      return await this.prisma.question.create({
        data: {
          content: data.content,
          answer: data.answer,
          points: data.points || 1,
          tryoutId: data.tryoutId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DBError("Error creating question in DB");
      }
      throw new DBError("Something went wrong while doing DB operation");
    }
  }

  async update(id: string, data: UpdateQuestion) {
    try {
      const updatedQuestion = await this.prisma.question.update({
        where: {
          id,
        },
        data,
      });
      return updatedQuestion;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DBError("Error updating question in DB");
      }
      throw new DBError("Something went wrong while doing DB operation");
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.question.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DBError("Error deleting question from DB");
      }
      throw new DBError("Something went wrong while doing DB operation");
    }
  }
}
