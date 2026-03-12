import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono , z } from '@hono/zod-openapi';

export const apiApp = new OpenAPIHono();


// Swagger UI endpoint
apiApp.get('/', swaggerUI({ url: '/swagger-ui/openapi.json' }));

// OpenAPI JSON endpoint
apiApp.doc('/openapi.json', {
	openapi: '3.0.0',
	info: {
		version: '1.0.0',
		title: 'MCP OAuth Template API',
		description: 'API endpoints for MCP OAuth Template tools',
	},
	servers: [
		{
			url: 'https://genius-mcp.xvzf.workers.dev',
			description: 'Production API Base URL',
		},
		{
			url: '/',
			description: 'Local API Base URL',
		},
	],
});

apiApp.openapi(
	{
		method: 'get',
		path: '/ping',
		responses: {
			200: {
				description: 'Pong message',
				content: {
					'application/json': {
						schema: z.object({
							message: z.string()
								.default('pong')
								.describe('The pong message')
						}),
					},
				},
			},
			400: {
				description: 'Error response',
				content: {
					'application/json': {
						schema: z.object({
							error: z.string(),
							message: z.string(),
						}),
					},
				},
			},
		},
		tags: ['Health'],
	},
	async (c) => {
		return c.json({ message: 'pong' }, 200);
	}
);

