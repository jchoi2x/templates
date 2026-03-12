# MCP OAuth Template

This repo contains a template for a Cloudflare MCP server **with OAuth authentication enabled**. It uses `hono` and OpenAPI as the HTTP framework and declares a class that extends `McpAgent` to define the MCP server. Unlike the plain `mcp-server-template` (which is just a basic Cloudflare MCP server), this `mcp-oauth-template` adds an OAuth flow so clients can authenticate via Google.

## Getting started

1. **Bootstrap environment variables**

   ```bash
   cp ./.dev.vars.example ./.dev.vars
   ```

   Then fill in the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` values as described in [Google OAuth setup](#google-oauth-setup).

2. **Install dependencies and run the dev server**

   ```bash
   pnpm install
   pnpm run dev
   ```

   The server will run on `http://localhost:8787`.

3. **Connect with MCP Inspector**
   - Start the inspector:
     ```bash
     npx @modelcontextprotocol/inspector@latest
     ```
   - In the inspector UI, connect to:
     - SSE endpoint: `http://localhost:8787/sse`
     - MCP endpoint: `http://localhost:8787/mcp`

   When you connect, the server will prompt you to log in with Google via the OAuth flow.

4. **API docs and OpenAPI**
   - Swagger UI: `http://localhost:8787/swagger-ui`
   - OpenAPI spec JSON: `http://localhost:8787/swagger-ui/openapi.json`

## Google OAuth setup

1. **Create OAuth credentials**
   - Go to the Google Cloud Console: [`https://console.cloud.google.com/apis/credentials`](https://console.cloud.google.com/apis/credentials).
   - Click **"Create Credentials" → "OAuth client ID"**.
   - When asked for authorized origins and redirect URIs:
     - **Authorized JavaScript origin**: `http://localhost:8787`
     - **Authorized redirect URI**: `http://localhost:8787/callback`
   - Click **Create** to obtain your **Client ID** and **Client Secret**.

2. **Configure local environment**
   - In your `.dev.vars` file, set the following variables using the values from the previous step:
     - `GOOGLE_CLIENT_ID`
     - `GOOGLE_CLIENT_SECRET`

Once these values are set, running the worker locally will enable the Google OAuth flow for the MCP server.
