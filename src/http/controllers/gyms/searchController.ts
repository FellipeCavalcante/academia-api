import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeSearchGymsService } from "@/services/factories/make-search-gyms-service";

export async function search(req: FastifyRequest, reply: FastifyReply) {
  const searchQuertySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchQuertySchema.parse(req.body);

  const searchGymService = makeSearchGymsService();

  const { gyms } = await searchGymService.execute({
    query: q,
    page,
  });

  return reply.status(201).send({
    gyms,
  });
}
