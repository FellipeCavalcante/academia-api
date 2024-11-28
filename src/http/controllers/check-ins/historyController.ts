import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchUserCheckInHistoryService } from "@/services/factories/make-fetch-user-check-ins-history-service";

export async function history(req: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(req.query);

  const fetchUserCheckInHistoryService = makeFetchUserCheckInHistoryService();

  const { checkIns } = await fetchUserCheckInHistoryService.execute({
    userId: req.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
}
