import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterService } from "../registerService";

export function makeRegisterService() {
  const UsersRepository = new PrismaUsersRepository();
  const registerService = new RegisterService(UsersRepository);

  return registerService;
}