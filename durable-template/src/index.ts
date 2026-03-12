import { OpenAPIHono } from "@hono/zod-openapi";
import { showRoutes } from "hono/dev";

import { apiApp } from "./routes";
export * from "./durable";

const app = new OpenAPIHono<{ Bindings: Env }>();

app.route('/api', apiApp);


showRoutes(apiApp);
export default app;