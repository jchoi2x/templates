
import { McpServerTemplate } from './McpServerTemplate.agent';
import { buildOAuthProvider } from "./oauth-provider";


export const McpOAuthProvider = buildOAuthProvider(McpServerTemplate);

export { McpServerTemplate };