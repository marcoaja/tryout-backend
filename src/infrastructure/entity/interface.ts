import type { Question, Tryout } from "@prisma/client";

export type CreateTryout = Omit<Tryout, "id" | "createdAt" | "updatedAt">;
export type UpdateTryout = Partial<CreateTryout>;

export type CreateQuestion = Omit<
	Question,
	"id" | "createdAt" | "updatedAt" | "tryoutId"
>;

export type UpdateQuestion = Partial<CreateQuestion>;

export interface ITryout {
	getAll: (filters?: {
		title?: string;
		startDate?: Date;
		endDate?: Date;
		isPublic?: boolean;
	}) => Promise<Tryout[]>;
	getOne: (id: string) => Promise<Tryout | null>;
	create: (data: CreateTryout) => Promise<Tryout>;
	addQuestion: (tryoutId: string, data: CreateQuestion) => Promise<Question>;
	update: (id: string, data: UpdateTryout) => Promise<Tryout>;
	delete: (id: string) => Promise<void>;
}

export interface IQuestion {
	getAll: (tryoutId: string) => Promise<Question[]>;
	getOne: (id: string) => Promise<Question | null>;
	create: (data: CreateQuestion & { tryoutId: string }) => Promise<Question>;
	update: (id: string, data: UpdateQuestion) => Promise<Question>;
	delete: (id: string) => Promise<void>;
}
