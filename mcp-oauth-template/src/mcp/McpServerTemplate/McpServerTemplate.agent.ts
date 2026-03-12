import { z } from "@hono/zod-openapi";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Connection, ConnectionContext } from "agents";
import { McpAgent } from "agents/mcp";


export type AuthContext = Record<string, unknown> & {
  claims: { sub: string; name: string; email: string };
  permissions: string[];
};


// Define our MCP agent with tools
export class McpServerTemplate<
    Env extends Cloudflare.Env = Cloudflare.Env, 
    State = unknown,
    Props extends AuthContext = AuthContext
> extends McpAgent<Env, State, Props> {

  server = new McpServer({
    name: "mcp-oauth-template",
    version: "1.0.0",
  });


  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }

  override async onConnect(conn: Connection, ctx: ConnectionContext) {
    await this.init();
    return super.onConnect(conn, ctx);
  }

  async init() {
    this.configureTools();
    this.configureResources();
    this.configurePrompts();
  }

  /**
   * Configure the tools for the MCP agent
   *
   * @memberof McpServerTemplate
   */
  async configureTools() {
    console.debug(`configureTools: ${JSON.stringify(this.props)}`)
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
        const props = this.props || {};
        return {
          content: [
            {
              type: "text",
              text: `Hello ${name}: ${JSON.stringify(props)}`,
            },
          ],
        };
      }
    );
  }


  /**
   * Configure the resources for the MCP agent
   *
   * @memberof McpServerTemplate
   */
  async configureResources() {

    this.server.resource(
      "mcp-oauth-template-hello-message",
      new ResourceTemplate("mcp-oauth-template://hello-message/{id}", { list: undefined }),
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

  /**
   * Configure the prompts for the MCP agent
   *
   * @memberof McpServerTemplate
   */
  async configurePrompts() {
    this.server.prompt(
      "mcp-oauth-template-hello-prompt",
      "Prepare a query to search for content in MCP OAuth Template.", {
        // We can add an optional argument for the initial search term if the client supports prompts with arguments
        initialQuery: z
          .string()
          .optional()
          .describe("An initial search term to include in the prompt."),
      },
      ({ initialQuery }) => {
        const queryText = initialQuery ? ` about "${initialQuery}"` : "";
        return {
          description: "This prompt helps you search in MCP OAuth Template.",
          messages: [
            {
              role: "user",
              content: {
                type: "text",
                text: `Please help me find information in MCP OAuth Template${queryText}. What do you want to search for?`,
              },
            },
          ],
        };
      }
    );
  }
}