import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { registerService } from "@/services/registerService";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerbodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerbodySchema.parse(req.body);

  try {
    await registerService({
      name,
      email,
      password,
    })
  } catch (error) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}