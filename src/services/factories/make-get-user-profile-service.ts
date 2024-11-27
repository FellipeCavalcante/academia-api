import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetProfileService } from "../get-user-profile";

export function makeGetUserProfileService() {
  const UsersRepository = new PrismaUsersRepository();
  const useService = new GetProfileService(UsersRepository);

  return useService;
}