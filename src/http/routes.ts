import { FastifyInstance } from "fastify";
import { register } from "./controllers/registerController";
import { autheticate } from "./controllers/authenticateController";
import { profile } from "./controllers/profileController";
import { verifyJWT } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", autheticate);

  /** Authenticated */
  app.get("/me", { onRequest: [verifyJWT] } ,profile); 
}