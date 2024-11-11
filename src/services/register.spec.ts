import { expect, describe, it } from "vitest"
import { RegisterService } from './registerService';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

describe("Register Service", () => {
  it("should be able to register", async () => {

    const usersRepository = new InMemoryUsersRepository();
    
    const registerService = new RegisterService(usersRepository);

    const { user } = await registerService.execute({
      name: "Jhon Doe",
      email: "jhon2.doe@example.com",
      password: "123456",
    })

    expect(user.id).toEqual(expect.any(String));
  })

  it("should hash user password upon registration", async () => {

    const usersRepository = new InMemoryUsersRepository();
    
    const registerService = new RegisterService(usersRepository);

    const { user } = await registerService.execute({
      name: "Jhon Doe",
      email: "jhon2.doe@example.com",
      password: "123456",
    })

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  })

  it("should not be able to register with same email same twice", async () => {

    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    await registerService.execute({
      name: "Jhon Doe",
      email: "jhon2.doe@example.com",
      password: "123456",
    })

   await expect(() => registerService.execute({
    name: "Jhon Doe",
    email: "jhon2.doe@example.com",
    password: "123456",
   })
  ).rejects.toBeInstanceOf(UserAlreadyExistsError)

  })
})