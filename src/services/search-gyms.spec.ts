import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymService } from "./search-gyms";

let gymsRepository: InMemoryGymRepository;
let sut: SearchGymService;

describe("Fetch Check-in History", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository();
    sut = new SearchGymService(gymsRepository);
  })

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "JavaScript gym",
      description: null,
      phone: null,
      latitude: -32.0378175,
      longitude: -52.0970702,
    })

    await gymsRepository.create({
     title: "TypeScript gym",
     description: null,
     phone: null,
     latitude: -32.0378175,
     longitude: -52.0970702,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript gym" })
    ])
  })

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TypeScript gym ${i}`,
        description: null,
        phone: null,
        latitude: -32.0378175,
        longitude: -52.0970702,
      })
    }

    const { gyms } = await sut.execute({
      query: 'TypeScript',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TypeScript gym 21' }),
      expect.objectContaining({ title: 'TypeScript gym 22' })
    ])
  })
})