import { UsersRepository } from '@/repositories/users-repository';
import { PrismaUsersRepository } from './../../repositories/prisma/prisma-users-repository';
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterService } from "@/services/registerService";
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists';

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerbodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerbodySchema.parse(req.body);

  try {
    const UsersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(UsersRepository);

    await registerService.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message});
    }

    throw error;
  }

  return reply.status(201).send();
}