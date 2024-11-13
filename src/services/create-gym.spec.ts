import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymService } from "./create-gymService";


let gymsRepository: InMemoryGymRepository;
let sut: CreateGymService

describe("Register Service", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository();
    sut = new CreateGymService(gymsRepository);
  })

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "heyfit centro",
      description: null,
      phone: null,
      latitude: -32.0378175,
      longitude: -52.0970702,
    })

    expect(gym.id).toEqual(expect.any(String));
  })
})