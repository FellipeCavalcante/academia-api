import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateService } from "./authenticateService";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateService;

describe("Authenticate Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateService(usersRepository);
  })

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Jhon Doe",
      email: "jhon2.doe@example.com",
      password_hash: await hash("123456", 6),
    })

    const { user } = await sut.execute({
      email: "jhon2.doe@example.com",
      password: "123456",
    })

    expect(user.id).toEqual(expect.any(String));
  })

  it("should be able to authenticate with wrong email", async () => {
    expect(() => sut.execute({
      email: "jhon2.doe@example.com",
      password: "123456",
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  })

  it("should be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "Jhon Doe",
      email: "jhon2.doe@example.com",
      password_hash: await hash("123456", 6),
    })

    expect(() => sut.execute({
      email: "jhon2.doe@example.com",
      password: "654321",
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  })
})