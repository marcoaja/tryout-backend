import { Container } from "inversify";
import { TYPES } from "../../infrastructure/entity/types";
import { PrismaClient } from "@prisma/client";
import { TryoutRepository } from "../../infrastructure/db/tryoutRepo";
import { QuestionRepository } from "../../infrastructure/db/questionRepo";
import { TryoutServices } from "./tryoutServices";
import { QuestionServices } from "./questionServices";

const container = new Container();

container.bind(TYPES.prisma).toConstantValue(new PrismaClient()); // Akan selalu sama dan single tone
container.bind(TYPES.tryoutRepo).to(TryoutRepository);
container.bind(TYPES.questionRepo).to(QuestionRepository);
container.bind(TryoutServices).toSelf();
container.bind(QuestionServices).toSelf();

// instances
export const tryoutServices = container.get<TryoutServices>(TryoutServices);
export const questionServices =
	container.get<QuestionServices>(QuestionServices);
