import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from 'hono/cors';
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";

import { McpServerTemplate, McpOAuthProvider } from "./mcp";
import { apiApp } from "./routes";
const app = new OpenAPIHono<{ Bindings: Env }>();

app.use(logger());
app.use('*', cors({
	origin: '*',
	allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));



app.route('/swagger-ui', apiApp);
app.route('/api', apiApp);


app.use('/*', async (c) => {
  return McpOAuthProvider.fetch(c.req.raw, c.env, c.executionCtx as ExecutionContext<Env>);
});


showRoutes(app);
export default app;
export { McpServerTemplate };