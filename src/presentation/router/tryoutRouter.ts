import Elysia, { t } from "elysia";
import {
  questionServices,
  tryoutServices,
} from "../../application/services/instance";

export const tryoutRouter = new Elysia({ prefix: "/v1/tryouts" })
  // Get all tryouts with filtering
  .get("/", async ({ query }) => {
    const filters = {
      title: query.title as string,
      startDate: query.startDate
        ? new Date(query.startDate as string)
        : undefined,
      endDate: query.endDate ? new Date(query.endDate as string) : undefined,
    };

    const tryouts = await tryoutServices.getAll(filters);
    return tryouts;
  })

  // Get a specific tryout
  .get("/:id", async ({ params }) => {
    const tryout = await tryoutServices.getOne(params.id);
    if (!tryout) {
      return { error: "Tryout not found" };
    }
    return tryout;
  })

  // Create a new tryout
  .post(
    "/",
    async ({ body, set }) => {
      const newTryout = await tryoutServices.create({
        title: body.title,
        description: body.description,
        category: body.category,
        timeLimit: body.timeLimit,
      });
      set.status = 201;
      return newTryout;
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
        category: t.String(),
        timeLimit: t.Number(),
      }),
    }
  )

  // Update an existing tryout
  .patch(
    "/:id",
    async ({ params, body, set }) => {
      const tryout = await tryoutServices.getOne(params.id);
      if (!tryout) {
        set.status = 404;
        return { error: "Tryout not found" };
      }

      const updatedTryout = await tryoutServices.update(params.id, {
        title: body.title,
        category: body.category,
        description: body.description,
        timeLimit: body.timeLimit,
      });
      return updatedTryout;
    },
    {
      body: t.Object({
        title: t.Optional(t.String()),
        category: t.Optional(t.String()),
        description: t.Optional(t.String()),
        timeLimit: t.Optional(t.Number()),
      }),
    }
  )

  // Delete a tryout
  .delete("/:id", async ({ params, set }) => {
    await tryoutServices.delete(params.id);
    set.status = 204;
    return null;
  })

  // Get questions for a tryout
  .get("/:id/questions", async ({ params }) => {
    const questions = await questionServices.getAll(params.id);
    return questions;
  })

  // Add a true/false question to a tryout
  .post(
    "/:id/questions",
    async ({ params, body, set }) => {
      const tryout = await tryoutServices.getOne(params.id);
      if (!tryout) {
        set.status = 404;
        return { error: "Tryout not found" };
      }

      const questionData = {
        content: body.content,
        answer: body.answer,
        points: body.points || 1,
      };

      const newQuestion = await tryoutServices.addQuestion(
        params.id,
        questionData
      );
      set.status = 201;
      return newQuestion;
    },
    {
      body: t.Object({
        content: t.String(),
        answer: t.Boolean(),
        points: t.Optional(t.Number()),
      }),
    }
  );
