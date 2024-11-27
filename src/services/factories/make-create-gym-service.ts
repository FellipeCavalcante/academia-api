import { CreateGymService } from "../create-gymService";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repositorys";

export function makeCreateGymService() {
  const gymsRepository = new PrismaGymsRepository();
  const useService = new CreateGymService(gymsRepository);

  return useService;
}