import { expect, describe, it, beforeEach } from "vitest"
import { RegisterService } from './registerService';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterService

describe("Register Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterService(usersRepository);
  })

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "Jhon Doe",
      email: "jhon2.doe@example.com",
      password: "123456",
    })

    await expect(user.id).toEqual(expect.any(String));
  })

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "Jhon Doe",
      email: "jhon2.doe@example.com",
      password: "123456",
    })

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    await expect(isPasswordCorrectlyHashed).toBe(true);
  })

  it("should not be able to register with same email same twice", async () => {
    await sut.execute({
      name: "Jhon Doe",
      email: "jhon2.doe@example.com",
      password: "123456",
    })

   await expect(() => sut.execute({
    name: "Jhon Doe",
    email: "jhon2.doe@example.com",
    password: "123456",
   })
  ).rejects.toBeInstanceOf(UserAlreadyExistsError)

  })
})