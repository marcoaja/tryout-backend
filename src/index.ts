import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
import { tryoutRouter } from "./presentation/router/tryoutRouter";
import { questionRouter } from "./presentation/router/questionRouter";

const app = new Elysia()
  .use(
    cors({
      origin: "http://localhost:3000",
    })
  )
  .use(swagger({ path: "/docs" }))
  .group("/api", (app) => app.use(tryoutRouter).use(questionRouter))
  .listen(8000);
