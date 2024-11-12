import { PrismaUsersRepository } from './../../repositories/prisma/prisma-users-repository';
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { AuthenticateService } from '@/services/authenticateService';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';

export async function autheticate(req: FastifyRequest, reply: FastifyReply) {
  const authenticatebodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticatebodySchema.parse(req.body);

  try {
    const UsersRepository = new PrismaUsersRepository();
    const authenticateService = new AuthenticateService(UsersRepository);

    await authenticateService.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message});
    }

    throw error;
  }

  return reply.status(200).send();
}