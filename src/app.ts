import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { usersRoutes } from "./http/controllers/users/routes";
import { gymsRoutes } from "./http/controllers/gyms/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(usersRoutes);
app.register(gymsRoutes);

app.setErrorHandler((error, _req, replay) => {
  if (error instanceof ZodError) {
    return replay.status(400).send({ message: "Validation error.", issus: error.format() });
  }

  if (env.NODE_ENV !== "production") {
      console.error(error);
  } else {
    //TODO: 
  }

  return replay.status(500).send("Internal server error");
})
