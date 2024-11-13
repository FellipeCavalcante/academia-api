import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { GetProfileService } from "./get-user-profile";
import { ResourceNotFound } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetProfileService;

describe("Get User Profile Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetProfileService(usersRepository);
  })

  it("should be get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "Jhon Doe",
      email: "jhon2.doe@example.com",
      password_hash: await hash("123456", 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

   await expect(user.id).toEqual(expect.any(String));
  })


  it("should be able to get user profile with wrong id", async () => {
  
    await expect(() => sut.execute({
      userId: 'non-existing-id'
    })).rejects.toBeInstanceOf(ResourceNotFound);
  })
})