import { FastifyInstance } from "fastify";
import { register } from "./controllers/registerController";
import { autheticate } from "./controllers/authenticateController";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  
  app.post("/sessions", autheticate);
}