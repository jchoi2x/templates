import { DurableObject } from "cloudflare:workers";

export class Room extends DurableObject {
  constructor(state: DurableObjectState, env: Env) {
    super(state, env);
  }
}