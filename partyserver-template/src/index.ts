import { OpenAPIHono } from "@hono/zod-openapi";
import { showRoutes } from "hono/dev";
import { routePartykitRequest } from "partyserver";

import { apiApp } from "./routes";
export * from "./durable";

const app = new OpenAPIHono<{ Bindings: Env }>();

app.route('/api', apiApp);

app.use('*', async (c) => {
  const partyKitResponse = await routePartykitRequest(c.req.raw, c.env);
  return partyKitResponse || new Response('Not found', { status: 404 });
});



showRoutes(apiApp);
export default app;