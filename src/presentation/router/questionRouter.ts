import Elysia, { t } from "elysia";
import { questionServices } from "../../application/services/instance";

export const questionRouter = new Elysia({ prefix: "/v1/questions" })
	// Get all questionss
	.get("/", async ({ query }) => {
		const tryoutId = query.tryoutId;
		if (!tryoutId) {
			return { error: "tryoutId query parameter is required" };
		}
		const questions = await questionServices.getAll(tryoutId as string);
		return questions;
	})

	// Get a specific question
	.get("/:id", async ({ params }) => {
		const question = await questionServices.getOne(params.id);
		if (!question) {
			return { error: "Question not found" };
		}
		return question;
	})

	// Update a question
	.patch(
		"/:id",
		async ({ params, body, set }) => {
			const question = await questionServices.getOne(params.id);
			if (!question) {
				set.status = 404;
				return { error: "Question not found" };
			}

			const updatedQuestion = await questionServices.update(params.id, {
				content: body.content,
				answer: body.answer,
				points: body.points,
			});
			return updatedQuestion;
		},
		{
			body: t.Object({
				content: t.Optional(t.String()),
				answer: t.Optional(t.Boolean()),
				points: t.Optional(t.Number()),
			}),
		},
	)

	// Delete a question
	.delete("/:id", async ({ params, set }) => {
		const question = await questionServices.getOne(params.id);
		if (!question) {
			set.status = 404;
			return { error: "Question not found" };
		}

		await questionServices.delete(params.id);
		set.status = 204;
		return null;
	});
