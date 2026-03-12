import { Server } from "partyserver";

export class Room extends Server {
  constructor(state: DurableObjectState, env: Env) {
    super(state, env);
  }
}