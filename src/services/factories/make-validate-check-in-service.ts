import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { ValidateCheckInService } from "../validate-check-ins";

export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useService = new ValidateCheckInService(checkInsRepository);

  return useService;
}