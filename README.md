Templates for `npm create cloudflare@latest`.

### Available templates

The templates in this repo can be used via:

```bash
npm create cloudflare@latest -- simple-user-management --template=jchoi2x/templates/<template-name>
```

Replace `<template-name>` with one of the template directories documented below.

---

### `durable-template`

**Description**

Cloudflare Worker template that uses a Durable Object, `hono`, and OpenAPI for the HTTP framework.

**Technologies**

| Technology    | Used |
| ------------- | :--: |
| `hono`        | ✅   |
| `hono-openapi` (`@hono/zod-openapi`) | ✅   |
| `zod`         | ✅   |

**Create command**

```bash
npm create cloudflare@latest -- simple-user-management --template=jchoi2x/templates/durable-template
```

---

### `partyserver-template`

**Description**

Cloudflare Worker template that uses a Durable Object, `hono`, OpenAPI, and `partyserver`, based on the `durable-template` project.

**Technologies**

| Technology    | Used |
| ------------- | :--: |
| `hono`        | ✅   |
| `hono-openapi` (`@hono/zod-openapi`) | ✅   |
| `zod`         | ✅   |

**Create command**

```bash
npm create cloudflare@latest -- simple-user-management --template=jchoi2x/templates/partyserver-template
```

---

### `mcp-server-template`

**Description**

Cloudflare MCP server template that uses `hono` and OpenAPI as the HTTP framework and declares a class that extends `McpAgent` to define the MCP server.

**Technologies**

| Technology    | Used |
| ------------- | :--: |
| `hono`        | ✅   |
| `hono-openapi` (`@hono/zod-openapi`) | ✅   |
| `zod`         | ✅   |

**Create command**

```bash
npm create cloudflare@latest -- simple-user-management --template=jchoi2x/templates/mcp-server-template
```

---

### `mcp-oauth-template`

**Description**

Cloudflare MCP server template **with OAuth authentication enabled**. Uses `hono` and OpenAPI as the HTTP framework and declares a class that extends `McpAgent` to define the MCP server, adding an OAuth flow (e.g. Google) on top of the basic MCP server.

**Technologies**

| Technology    | Used |
| ------------- | :--: |
| `hono`        | ✅   |
| `hono-openapi` (`@hono/zod-openapi`) | ✅   |
| `zod`         | ✅   |

**Create command**

```bash
npm create cloudflare@latest -- simple-user-management --template=jchoi2x/templates/mcp-oauth-template
```
