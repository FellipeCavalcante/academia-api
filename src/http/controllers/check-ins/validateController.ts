import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeValidateCheckInService } from "@/services/factories/make-validate-check-in-service";

export async function validate(req: FastifyRequest, reply: FastifyReply) {
  const validateParamsCheckInSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateParamsCheckInSchema.parse(req.params);

  const validateCheckInService = makeValidateCheckInService();

  await validateCheckInService.execute({
    checkInId,
  });

  return reply.status(204).send();
}
