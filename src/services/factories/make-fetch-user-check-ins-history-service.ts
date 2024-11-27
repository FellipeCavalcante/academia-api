import { FecthUserCheckInsHistory } from "../fetch-user-check-ins-history";
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';

export function makeFetchUserCheckInHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useService = new FecthUserCheckInsHistory(checkInsRepository);

  return useService;
}