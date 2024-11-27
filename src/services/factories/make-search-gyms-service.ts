import { SearchGymService } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repositorys";

export function makeSearchGymsService() {
  const gymsRepository = new PrismaGymsRepository();
  const useService = new SearchGymService(gymsRepository);

  return useService;
}