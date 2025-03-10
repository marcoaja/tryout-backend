import { Prisma, type PrismaClient } from "@prisma/client";
import type {
  CreateQuestion,
  CreateTryout,
  ITryout,
  UpdateTryout,
} from "../entity/interface";
import "reflect-metadata";
import { injectable, inject } from "inversify";
import { TYPES } from "../entity/types";
import { DBError } from "../entity/error";

@injectable()
export class TryoutRepository implements ITryout {
  private prisma: PrismaClient;

  constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAll(filters?: {
    title?: string;
    startDate?: Date;
    endDate?: Date;
    category?: string;
  }) {
    try {
      // Build the where clause based on filters
      const where: any = {};

      if (filters?.title) {
        where.title = {
          contains: filters.title,
          mode: "insensitive", // Case insensitive search
        };
      }

      if (filters?.startDate) {
        where.createdAt = {
          ...(where.createdAt || {}),
          gte: filters.startDate,
        };
      }

      if (filters?.endDate) {
        where.createdAt = {
          ...(where.createdAt || {}),
          lte: filters.endDate,
        };
      }

      const tryouts = await this.prisma.tryout.findMany({
        where,
        include: {
          _count: {
            select: {
              questions: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return tryouts;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DBError("Error getting resources from DB");
      }

      throw new DBError("Something went wrong while doing DB operation");
    }
  }

  async getOne(id: string) {
    try {
      const tryout = await this.prisma.tryout.findUnique({
        where: { id },
        include: {
          questions: true,
        },
      });

      return tryout;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DBError("Error getting resource from DB");
      }

      throw new DBError("Something went wrong while doing DB operation");
    }
  }

  async create(data: CreateTryout) {
    try {
      const newTryout = await this.prisma.tryout.create({
        data,
      });
      return newTryout;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DBError("Error creating tryout in DB");
      }

      throw new DBError("Something went wrong while doing DB operation");
    }
  }

  async addQuestion(tryoutId: string, data: CreateQuestion) {
    try {
      const newQuestion = await this.prisma.question.create({
        data: {
          ...data,
          tryoutId,
        },
      });

      return newQuestion;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DBError("Error creating question in DB");
      }

      throw new DBError("Something went wrong while doing DB operation");
    }
  }

  async update(id: string, data: UpdateTryout) {
    try {
      const updatedTryout = await this.prisma.tryout.update({
        where: { id },
        data,
      });
      return updatedTryout;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DBError("Error updating tryout in DB");
      }

      throw new DBError("Something went wrong while doing DB operation");
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.tryout.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DBError("Error deleting tryout from DB");
      }

      throw new DBError("Something went wrong while doing DB operation");
    }
  }
}
