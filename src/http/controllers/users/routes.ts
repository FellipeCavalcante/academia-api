import { FastifyInstance } from "fastify";
import { register } from "./registerController";
import { autheticate } from "./authenticateController";
import { profile } from "./profileController";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { refresh } from "./refreshController";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", autheticate);

  app.patch("/token/refresh", refresh);

  /** Authenticated */
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
