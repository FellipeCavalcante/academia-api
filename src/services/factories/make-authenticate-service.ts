import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "../authenticateService";

export function makeAuthenticateService() {
  const UsersRepository = new PrismaUsersRepository();
  const authenticateService = new AuthenticateService(UsersRepository);

  return authenticateService;
}