import { FastifyInstance } from "fastify";
import { register } from "./registerController";
import { autheticate } from "./authenticateController";
import { profile } from "./profileController";
import { verifyJWT } from "@/http/middlewares/verify-jwt";


export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", autheticate);

  /** Authenticated */
  app.get("/me", { onRequest: [verifyJWT] } ,profile); 
}