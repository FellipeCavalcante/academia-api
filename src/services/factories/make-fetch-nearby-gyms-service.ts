import { FetchNearbyGymsService } from "../fetch-nearby-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repositorys";

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository();
  const useService = new FetchNearbyGymsService(gymsRepository);

  return useService;
}