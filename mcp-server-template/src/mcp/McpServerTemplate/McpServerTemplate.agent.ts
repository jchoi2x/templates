import { z } from "@hono/zod-openapi";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";

// Define our MCP agent with tools
export class McpServerTemplate extends McpAgent {
  server = new McpServer({
    name: "mcp-server-template",
    version: "1.0.0",
  });


  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }

  async init() {
    this.configureTools();
    this.configureResources();
    this.configurePrompts();
  }


  // genius-search-song
  async configureTools() {
    this.server.tool(
      "hello-mcp-template",
      "Hello world",
      {
        name: z
          .string()
          .describe("a test parameter")
          .default("testing hi")
      },
      async ({ name }) => {
        return {
          content: [
            {
              type: "text",
              text: `Hello ${name}!`,
            },
          ],
        };
      }
    );
  }


  async configureResources() {
    this.server.resource(
      "mcp-server-template-hello-message",
      new ResourceTemplate("mcp-server-template://hello-message/{id}", { list: undefined }),
      async (uri, { id }) => {
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "application/json",
              text: `Hello ${id}!`,
            },
          ],
        };
      }
    );
  }

  async configurePrompts() {
    this.server.prompt(
      "mcp-server-template-hello-prompt",
      "Prepare a query to search for content in MCP Server Template.", {
        // We can add an optional argument for the initial search term if the client supports prompts with arguments
        initialQuery: z
          .string()
          .optional()
          .describe("An initial search term to include in the prompt."),
      },
      ({ initialQuery }) => {
        const queryText = initialQuery ? ` about "${initialQuery}"` : "";
        return {
          description: "This prompt helps you search in MCP Server Template.",
          messages: [
            {
              role: "user",
              content: {
                type: "text",
                text: `Please help me find information in MCP Server Template${queryText}. What do you want to search for?`,
              },
            },
          ],
        };
      }
    );
  }
}
