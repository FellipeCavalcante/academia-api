import { CheckInService } from "../check-inService";
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repositorys';

export function makeCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const useService = new CheckInService(checkInsRepository, gymsRepository);

  return useService;
}