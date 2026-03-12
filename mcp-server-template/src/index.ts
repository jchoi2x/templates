import { OpenAPIHono } from "@hono/zod-openapi";
import { showRoutes } from "hono/dev";

import { McpServerTemplate } from "./mcp";
import { apiApp } from "./routes";

const app = new OpenAPIHono<{ Bindings: Env }>();

app.use('/sse/*', async (c) => {
  return McpServerTemplate.serveSSE("/sse").fetch(c.req.raw, c.env, c.executionCtx as ExecutionContext<Env>);
});

app.use('/mcp', async (c) => {
  return McpServerTemplate.serve("/mcp").fetch(c.req.raw, c.env, c.executionCtx as ExecutionContext<Env>);
});

app.route('/api', apiApp);


showRoutes(apiApp);
export default app;
export { McpServerTemplate };